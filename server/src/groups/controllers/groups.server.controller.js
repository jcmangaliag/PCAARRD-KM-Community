import Group from '../models/groups.server.model';
import Post from '../../posts/models/posts.server.model';
import User from '../../users/models/users.server.model';

const groupControls = { 
	list : (req, res) => {	// get all groups
		Group.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ groups: results });
	    });
	},
	listByMyGroups : (req, res) => {	// get groups joined by user
	    const userID = req.params.userID;

		User.findOne({_id: userID}, (err, result) => {
			if (err) { 
				return (err);  
			} else if (result === null) {
				return res.status(404).send('User not found!');
			}

			Group.find({handle: {$in: result.groupsJoined}}, (err, results) => {
		        if (err) { return (err); }

		        res.send({ groups: results });
		    });
		});
	},
	listByDiscoverGroups : (req, res) => {	// get groups not joined by user
		const userID = req.params.userID;

		User.findOne({_id: userID}, (err, result) => {
			if (err) { 
				return (err);  
			} else if (result === null) {
				return res.status(404).send('User not found!');
			}

			Group.find({handle: {$nin: result.groupsJoined}}, (err, results) => {
		        if (err) { return (err); }

		        res.send({ groups: results });
		    });
		});
	},
	listSome : (req, res) => {	// get all groups details of given group handles
		const handles = req.params.handles.split(',');

		Group.find({handle: {$in: handles}}, (err, results) => {
			if (err) { return (err); }

		    res.send({groups: results });
		});
	},
	listAdministeredGroups  : (req, res) => {	// get all administered groups of user
		Group.find({admin: req.params.userID}, (err, results) => {
			if (err) { return (err); }

		    res.send({groups: results });
		});
	},
	listPendingGroups  : (req, res) => {	// get all pending groups of user
		Group.find({pendingMembers: req.params.userID}, (err, results) => {
			if (err) { return (err); }

		    res.send({groups: results });
		});
	},
	listByGroupSearch: (req, res) => {	// using query, search groups by name, description or tech handle used in posts (e.g. ../all?name=banana)
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
	listOne : (req, res) => {	// get one group
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
	post : (req, res) => {	// post one group
		const group = new Group(req.body);
		group.save((err) => {
			if (err) { return (err); }

			res.send('Group saved.');
		});
	},
	updateOne : (req, res) => {	// modify one group
		const handle = req.params.handle;

		Group.findOneAndUpdate({handle}, { $set: req.body }, (err) => {
			if (err) { return (err); }

			res.send("Group updated.");
		});
	},
	removeOne : (req, res) => {	// delete one group
		const handle = req.params.handle;

		Group.findOneAndRemove({handle}, (err, result) => {
			if (err) { return (err); }

			res.send("Group deleted.");
		});
	},
	addAdmin : (req, res) => {	// add one admin to group
		const userID = req.params.userID;
		const handle = req.params.handle;

		Group.findOneAndUpdate({handle}, { $addToSet: {admin: userID}}, (err) => {
			if (err) { return (err); }

			res.send("Group added an admin.");
		});
	},
	removeAdmin : (req, res) => {	// remove one admin to group
		const userID = req.params.userID;
		const handle = req.params.handle;

		Group.findOneAndUpdate({handle}, { $pull: {admin: userID}}, (err) => {
			if (err) { return (err); }

			res.send("Group removed an admin.");
		});
	},
	addToPendingMembers : (req, res) => {	// add one pending member to group
		const userID = req.params.userID;
		const handle = req.params.handle;

		Group.findOneAndUpdate({handle}, { $addToSet: {pendingMembers: userID}}, (err) => {
			if (err) { return (err); }

			res.send("Group added a pending member.");
		});
	},
	removeFromPendingMembers : (req, res) => {	// remove one pending member to group
		const userID = req.params.userID;
		const handle = req.params.handle;

		Group.findOneAndUpdate({handle}, { $pull: {pendingMembers: userID}}, (err) => {
			if (err) { return (err); }

			res.send("Group removed a pending member.");
		});
	},
}

export default groupControls;
