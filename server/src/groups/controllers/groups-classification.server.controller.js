import GroupClassification from '../models/groups-classification.server.model';

const groupClassificationControls = { 
	list : (req, res) => {	// get all group classifications
		GroupClassification.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ groupClassifications: results });
	    });
	},
	post : (req, res) => {	// post a group classification
		const classification = new GroupClassification(req.body);
		classification.save((err) => {
			if (err) { return (err); }

			res.send('Group Classification saved.');
		});
	},
	updateOne : (req, res) => {	// modify a group classification
		const id = req.params.id;

		GroupClassification.findByIdAndUpdate(id, { $set: req.body }, (err) => {
			if (err) { return (err); }

			res.send("Group Classification updated.");
		});
	},
	removeOne : (req, res) => {	// delete a group classification
		const id = req.params.id;

		GroupClassification.findByIdAndRemove(id, (err, result) => {
			if (err) { return (err); }

			res.send("Group Classification deleted.");
		});
	}
}

export default groupClassificationControls;
