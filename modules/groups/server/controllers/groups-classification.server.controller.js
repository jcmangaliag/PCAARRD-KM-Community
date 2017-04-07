import GroupClassification from '../models/groups-classification.server.model';

const groupClassificationControls = { 
	list : (req, res) => {
		GroupClassification.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ groupClassifications: results });
	    });
	},
	listOne : (req, res) => {
		const id = req.params.id;

		GroupClassification.findById(id, (err, result) => {
			if (err) { 
				return (err);  
			} else if (result === null) {
				return res.status(404).send('Group Classification not found!');
			}
			
			res.send({ groupClassification: result });
		});
	},
	post : (req, res) => {
		const classification = new GroupClassification(req.body);
		classification.save((err) => {
			if (err) { return (err); }

			res.send('Group Classification saved.');
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
