import mongoose from 'mongoose';
const User = mongoose.model('User');

const userControls = { 
	listOne : (req, res) => {
		const userID = req.params.userID;

		User.findOne({_id: userID}, (err, result) => {
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
		const userID = req.params.userID;

		User.findOneAndUpdate({_id: userID}, { $set: req.body }, (err) => {
			if (err) { return (err); }

			let user = new User(req.body);
			let token = user.generateJwt();
			res.status(200).json({"message": "User updated.", "token": token});
		});
	}
}

export default userControls;
