import Group from '../models/groups.server.model';

const groupControls = { 
	list : (req, res) => {
		Group.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ groups: results });
	    });
	},
	listOne : (req, res) => {
		const handle = req.params.handle;

		Group.find({handle}, (err, result) => {
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

		Group.findOneAndUpdate({handle}, { $set: req.body.updatedFields }, (err) => {
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
