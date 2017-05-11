'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('User');

var userControls = {
	listOne: function listOne(req, res) {
		var userID = req.params.userID;

		User.findOne({ _id: userID }, function (err, result) {
			if (err) {
				return err;
			} else if (result === null) {
				return res.status(404).send('User not found!');
			}

			res.send({ user: result });
		});
	},
	list: function list(req, res) {
		User.find(function (err, results) {
			if (err) {
				return err;
			}

			res.send({ users: results });
		});
	},
	listByGroup: function listByGroup(req, res) {
		User.find({ groupsJoined: req.params.groupHandle }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ users: results });
		});
	},
	listByGroupAdminstrators: function listByGroupAdminstrators(req, res) {
		var groupAdminsList = req.params.groupAdminsID.split(',');

		User.find({ _id: { $in: groupAdminsList } }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ users: results });
		});
	},
	listByGroupPendingMembers: function listByGroupPendingMembers(req, res) {
		var groupPendingMembersList = req.params.groupPendingMembersID.split(',');

		User.find({ _id: { $in: groupPendingMembersList } }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ users: results });
		});
	},
	updateOne: function updateOne(req, res) {
		var userID = req.params.userID;

		User.findOneAndUpdate({ _id: userID }, { $set: req.body }, function (err) {
			if (err) {
				return err;
			}

			res.send("User updated.");
		});
	},
	joinGroup: function joinGroup(req, res) {
		var userID = req.params.userID;
		var groupHandle = req.params.groupHandle;

		User.findOneAndUpdate({ _id: userID }, { $addToSet: { groupsJoined: groupHandle } }, function (err) {
			if (err) {
				return err;
			}

			res.send("User joined a group.");
		});
	},
	leaveGroup: function leaveGroup(req, res) {
		var userID = req.params.userID;
		var groupHandle = req.params.groupHandle;

		User.findOneAndUpdate({ _id: userID }, { $pull: { groupsJoined: groupHandle } }, function (err) {
			if (err) {
				return err;
			}

			res.send("User left a group.");
		});
	}
};

exports.default = userControls;