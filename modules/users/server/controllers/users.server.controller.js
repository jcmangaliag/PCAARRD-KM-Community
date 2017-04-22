import mongoose from 'mongoose';
const User = mongoose.model('User');

const userControls = { 
	listOne : (req, res) => {
		const email = req.params.email;

		User.findOne({email}, (err, result) => {
			if (err) { 
				return (err);  
			} else if (result === null) {
				return res.status(404).send('User not found!');
			}
			
			res.send({user: result});
		});
	},
	list : (req, res) => {
		User.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ users: results });
	    });
	},
	listByGroup : (req, res) => {
		User.find({groupJoined: req.params.groupHandle}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ users: results });
	    });
	},
	updateOne : (req, res) => {
		const email = req.params.email;

		Group.findOneAndUpdate({email}, { $set: req.body }, (err) => {
			if (err) { return (err); }

			res.send("User updated.");
		});
	}
}

export default userControls;
