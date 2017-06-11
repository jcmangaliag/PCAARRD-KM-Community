import mongoose from 'mongoose';
const User = mongoose.model('User');

const userControls = { 
	listOne : (req, res) => {	// get one user
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
	list : (req, res) => {	// get all users
		User.find((err, results) => {
	        if (err) { return (err); }

	        res.send({ users: results });
	    });
	},
	listByGroup : (req, res) => {	// get users by group
		User.find({groupsJoined: req.params.groupHandle}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ users: results });
	    });
	},
	listByGroupAdminstrators : (req, res) => {	// get users by group admins
		const groupAdminsList = req.params.groupAdminsID.split(',');

		User.find({_id: {$in: groupAdminsList}}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ users: results });
	    });
	},
	listByGroupPendingMembers : (req, res) => {	// get users by pending members
		const groupPendingMembersList = req.params.groupPendingMembersID.split(',');

		User.find({_id: {$in: groupPendingMembersList}}, (err, results) => {
	        if (err) { return (err); }

	        res.send({ users: results });
	    });
	},
	updateOne : (req, res) => {	// modify a user
		const userID = req.params.userID;

		User.findOneAndUpdate({_id: userID}, { $set: req.body }, (err) => {
			if (err) { return (err); }

			res.send("User updated.");
		});
	},
	joinGroup : (req, res) => {	// add a group to user's groupjoined
		const userID = req.params.userID;
		const groupHandle = req.params.groupHandle;

		User.findOneAndUpdate({_id: userID}, { $addToSet: {groupsJoined: groupHandle}}, (err) => {
			if (err) { return (err); }

			res.send("User joined a group.");
		});
	},
	leaveGroup : (req, res) => {	// remove a group to user's groupjoined
		const userID = req.params.userID;
		const groupHandle = req.params.groupHandle;

		User.findOneAndUpdate({_id: userID}, { $pull: {groupsJoined: groupHandle}}, (err) => {
			if (err) { return (err); }

			res.send("User left a group.");
		});
	}  
}

export default userControls;
