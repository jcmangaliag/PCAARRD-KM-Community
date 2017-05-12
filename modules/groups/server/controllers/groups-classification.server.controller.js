import GroupClassification from '../models/groups-classification.server.model';

const groupClassificationControls = { 
	list : (req, res) => {
		GroupClassification.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ groupClassifications: results });
	    });
	},
	post : (req, res) => {
		const classification = new GroupClassification(req.body);
		classification.save((err) => {
			if (err) { return (err); }

			res.send('Group Classification saved.');
		});
	},
	updateOne : (req, res) => {
		const id = req.params.id;

		GroupClassification.findByIdAndUpdate(id, { $set: req.body }, (err) => {
			if (err) { return (err); }

			res.send("Group Classification updated.");
		});
	},
	removeOne : (req, res) => {
		const id = req.params.id;

		GroupClassification.findByIdAndRemove(id, (err, result) => {
			if (err) { return (err); }

			res.send("Group Classification deleted.");
		});
	}
}

export default groupClassificationControls;
