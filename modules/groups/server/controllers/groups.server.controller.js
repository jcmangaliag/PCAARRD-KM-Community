import Group from '../models/groups.server.model';
import Post from '../../../posts/server/models/posts.server.model';

const groupControls = { 
	list : (req, res) => {
		Group.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ groups: results });
	    });
	},
	listByMyGroups : (req, res) => {
		Group.find({members: req.params.userID}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ groups: results });
	    });
	},
	listByDiscoverGroups : (req, res) => {
		Group.find({members: { "$ne": req.params.userID}}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ groups: results });
	    });
	},
	listByGroupSearch: (req, res) => {
		let query = {};

		if (req.query.name){
			query.name = { "$regex": `^${req.query.name}$`, "$options": "i"};
		} 

		if (req.query.description){
			query.description = { "$regex": `\\b${req.query.description}\\b`, "$options": "i"};
		}

		if (req.query.technology){
			Post.distinct("groupBelonged", {technologyHandles: { "$regex": `^${req.query.technology}$`, "$options": "i"}}, (err, results) => {
		        if (err) { return (err); }

		        query.handle = {"$in": results};
		        
		        Group.find(query, (err, results) => {
			        if (err) { return (err); }

			        res.send({ groups: results });
			    });
		    });
		} else {
			Group.find(query, (err, results) => {
		        if (err) { return (err); }

		        res.send({ groups: results });
		    });
		}
	},
	listOne : (req, res) => {
		const handle = req.params.handle;

		Group.findOne({handle}, (err, result) => {
			if (err) { 
				return (err);  
			} else if (result === null) {
				return res.status(404).send('Group not found!');
			}
			
			res.send({group: result});
		});
	},
	post : (req, res) => {
		const group = new Group(req.body);
		group.save((err) => {
			if (err) { return (err); }

			res.send('Group saved.');
		});
	},
	updateOne : (req, res) => {
		const handle = req.params.handle;

		Group.findOneAndUpdate({handle}, { $set: req.body }, (err) => {
			if (err) { return (err); }

			res.send("Group updated.");
		});
	},
	removeOne : (req, res) => {
		const handle = req.params.handle;

		Group.findOneAndRemove({handle}, (err, result) => {
			if (err) { return (err); }

			res.send("Group deleted.");
		});
	}
}

export default groupControls;
