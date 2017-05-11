'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _groupsServer = require('../models/groups.server.model');

var _groupsServer2 = _interopRequireDefault(_groupsServer);

var _postsServer = require('../../../posts/server/models/posts.server.model');

var _postsServer2 = _interopRequireDefault(_postsServer);

var _usersServer = require('../../../users/server/models/users.server.model');

var _usersServer2 = _interopRequireDefault(_usersServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupControls = {
	list: function list(req, res) {
		_groupsServer2.default.find(function (err, results) {
			if (err) {
				return err;
			}

			res.send({ groups: results });
		});
	},
	listByMyGroups: function listByMyGroups(req, res) {
		var userID = req.params.userID;

		_usersServer2.default.findOne({ _id: userID }, function (err, result) {
			if (err) {
				return err;
			} else if (result === null) {
				return res.status(404).send('User not found!');
			}

			_groupsServer2.default.find({ handle: { $in: result.groupsJoined } }, function (err, results) {
				if (err) {
					return err;
				}

				res.send({ groups: results });
			});
		});
	},
	listByDiscoverGroups: function listByDiscoverGroups(req, res) {
		var userID = req.params.userID;

		_usersServer2.default.findOne({ _id: userID }, function (err, result) {
			if (err) {
				return err;
			} else if (result === null) {
				return res.status(404).send('User not found!');
			}

			_groupsServer2.default.find({ handle: { $nin: result.groupsJoined } }, function (err, results) {
				if (err) {
					return err;
				}

				res.send({ groups: results });
			});
		});
	},
	listSome: function listSome(req, res) {
		var handles = req.params.handles.split(',');

		_groupsServer2.default.find({ handle: { $in: handles } }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ groups: results });
		});
	},
	listAdministeredGroups: function listAdministeredGroups(req, res) {
		_groupsServer2.default.find({ admin: req.params.userID }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ groups: results });
		});
	},
	listPendingGroups: function listPendingGroups(req, res) {
		_groupsServer2.default.find({ pendingMembers: req.params.userID }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ groups: results });
		});
	},
	listByGroupSearch: function listByGroupSearch(req, res) {
		var query = {};

		if (req.query.name) {
			query.name = { "$regex": '^' + req.query.name + '$', "$options": "i" };
		}

		if (req.query.description) {
			query.description = { "$regex": '\\b' + req.query.description + '\\b', "$options": "i" };
		}

		if (req.query.technology) {
			_postsServer2.default.distinct("groupBelonged", { technologyHandles: { "$regex": '^' + req.query.technology + '$', "$options": "i" } }, function (err, results) {
				if (err) {
					return err;
				}

				query.handle = { "$in": results };

				_groupsServer2.default.find(query, function (err, results) {
					if (err) {
						return err;
					}

					res.send({ groups: results });
				});
			});
		} else {
			_groupsServer2.default.find(query, function (err, results) {
				if (err) {
					return err;
				}

				res.send({ groups: results });
			});
		}
	},
	listOne: function listOne(req, res) {
		var handle = req.params.handle;

		_groupsServer2.default.findOne({ handle: handle }, function (err, result) {
			if (err) {
				return err;
			} else if (result === null) {
				return res.status(404).send('Group not found!');
			}

			res.send({ group: result });
		});
	},
	post: function post(req, res) {
		var group = new _groupsServer2.default(req.body);
		group.save(function (err) {
			if (err) {
				return err;
			}

			res.send('Group saved.');
		});
	},
	updateOne: function updateOne(req, res) {
		var handle = req.params.handle;

		_groupsServer2.default.findOneAndUpdate({ handle: handle }, { $set: req.body }, function (err) {
			if (err) {
				return err;
			}

			res.send("Group updated.");
		});
	},
	removeOne: function removeOne(req, res) {
		var handle = req.params.handle;

		_groupsServer2.default.findOneAndRemove({ handle: handle }, function (err, result) {
			if (err) {
				return err;
			}

			res.send("Group deleted.");
		});
	},
	addAdmin: function addAdmin(req, res) {
		var userID = req.params.userID;
		var handle = req.params.handle;

		_groupsServer2.default.findOneAndUpdate({ handle: handle }, { $addToSet: { admin: userID } }, function (err) {
			if (err) {
				return err;
			}

			res.send("Group added an admin.");
		});
	},
	removeAdmin: function removeAdmin(req, res) {
		var userID = req.params.userID;
		var handle = req.params.handle;

		_groupsServer2.default.findOneAndUpdate({ handle: handle }, { $pull: { admin: userID } }, function (err) {
			if (err) {
				return err;
			}

			res.send("Group removed an admin.");
		});
	},
	addToPendingMembers: function addToPendingMembers(req, res) {
		var userID = req.params.userID;
		var handle = req.params.handle;

		_groupsServer2.default.findOneAndUpdate({ handle: handle }, { $addToSet: { pendingMembers: userID } }, function (err) {
			if (err) {
				return err;
			}

			res.send("Group added a pending member.");
		});
	},
	removeFromPendingMembers: function removeFromPendingMembers(req, res) {
		var userID = req.params.userID;
		var handle = req.params.handle;

		_groupsServer2.default.findOneAndUpdate({ handle: handle }, { $pull: { pendingMembers: userID } }, function (err) {
			if (err) {
				return err;
			}

			res.send("Group removed a pending member.");
		});
	}
};

exports.default = groupControls;