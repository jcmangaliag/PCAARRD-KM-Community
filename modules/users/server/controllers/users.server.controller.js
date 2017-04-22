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
	}
}

export default userControls;
