import Group from '../models/groups.server.model';

const groupControls = { 
	list : (req, res) => {
		Group.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ groups: results });
	    });
	},
	listOne : (req, res) => {
		const id = req.params.id;

		Group.findById(id, (err, result) => {
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
		const id = req.params.id;

		Group.findByIdAndUpdate(id, { $set: req.body.updatedFields }, (err) => {
			if (err) { return (err); }

			res.send("Group updated.");
		});
	},
	removeOne : (req, res) => {
		const id = req.params.id;

		Group.findByIdAndRemove(id, (err, result) => {
			if (err) { return (err); }

			res.send("Group deleted.");
		});
	}
}

export default groupControls;
