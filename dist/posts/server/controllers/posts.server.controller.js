'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _postsServer = require('../models/posts.server.model');

var _postsServer2 = _interopRequireDefault(_postsServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postControls = {
	list: function list(req, res) {
		// not in front end
		_postsServer2.default.find(function (err, results) {
			if (err) {
				return err;
			}

			res.send({ posts: results });
		});
	},
	listByCategory: function listByCategory(req, res) {
		// not in front end
		_postsServer2.default.find({ category: req.params.category }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ posts: results });
		});
	},
	listByGroupBelonged: function listByGroupBelonged(req, res) {
		var query = { groupBelonged: req.params.handle };

		if (req.query && req.query.showPublic) {
			query.showPublic = req.query.showPublic;
		}

		_postsServer2.default.find(query, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ posts: results });
		});
	},
	listByGroupBelongedAndCategory: function listByGroupBelongedAndCategory(req, res) {
		var query = { groupBelonged: req.params.handle, category: req.params.category };

		if (req.query && req.query.showPublic) {
			query.showPublic = req.query.showPublic;
		}

		_postsServer2.default.find(query, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ posts: results });
		});
	},
	listByMyGroups: function listByMyGroups(req, res) {
		var myGroups = req.params.myGroups.split(',');
		_postsServer2.default.find({ groupBelonged: { $in: myGroups } }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ posts: results });
		});
	},
	listByMyGroupsAndCategory: function listByMyGroupsAndCategory(req, res) {
		var myGroups = req.params.myGroups.split(',');

		_postsServer2.default.find({ groupBelonged: { $in: myGroups }, category: req.params.category }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ posts: results });
		});
	},
	listByUser: function listByUser(req, res) {
		_postsServer2.default.find({ 'postedBy._id': req.params.userID, showPublic: true }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ posts: results });
		});
	},
	listLengthByUser: function listLengthByUser(req, res) {
		_postsServer2.default.find({ 'postedBy._id': req.params.userID }).count(function (err, count) {
			if (err) {
				return err;
			}

			res.send({ postsLength: count });
		});
	},
	listByUserAndCategory: function listByUserAndCategory(req, res) {
		_postsServer2.default.find({ 'postedBy._id': req.params.userID, category: req.params.category, showPublic: true }, function (err, results) {
			if (err) {
				return err;
			}

			res.send({ posts: results });
		});
	},
	listOne: function listOne(req, res) {
		var id = req.params.id;

		_postsServer2.default.findById(id, function (err, result) {
			if (err) {
				return err;
			} else if (result === null) {
				return res.status(404).send('Post not found!');
			}

			res.send({ post: result });
		});
	},
	post: function post(req, res) {
		var post = new _postsServer2.default(req.body);
		post.save(function (err) {
			if (err) {
				return err;
			}

			res.send('Post saved.');
		});
	},
	updateReactions: function updateReactions(req, res) {
		var id = req.params.id;

		_postsServer2.default.findByIdAndUpdate(id, { reactions: req.body.reactions }, function (err) {
			if (err) {
				return err;
			}

			res.send("Post updated.");
		});
	},
	removeOne: function removeOne(req, res) {
		var id = req.params.id;

		_postsServer2.default.findByIdAndRemove(id, function (err, result) {
			if (err) {
				return err;
			}

			res.send("Post deleted.");
		});
	}
};

exports.default = postControls;