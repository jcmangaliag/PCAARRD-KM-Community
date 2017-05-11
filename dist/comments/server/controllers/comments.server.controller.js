'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _commentsServer = require('../models/comments.server.model');

var _commentsServer2 = _interopRequireDefault(_commentsServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentControls = {
	list: function list(req, res) {
		_commentsServer2.default.find(function (err, results) {
			if (err) {
				console.log(err);
			}

			res.send({ comments: results });
		});
	},
	listByReferredPost: function listByReferredPost(req, res) {
		var referredPost = req.params.referredPost;

		_commentsServer2.default.find({ referredPost: referredPost }, function (err, results) {
			if (err) {
				console.log(err);
			}

			res.send({ comments: results });
		});
	},
	listLengthByGroupBelonged: function listLengthByGroupBelonged(req, res) {
		var groupBelonged = req.params.groupBelonged;

		_commentsServer2.default.find({ groupBelonged: groupBelonged }).count(function (err, count) {
			if (err) {
				return err;
			}

			res.send({ commentsLength: count });
		});
	},
	listByUserComments: function listByUserComments(req, res) {
		var referredPost = req.params.referredPost;
		var commentedBy = req.params.commentedBy;

		_commentsServer2.default.find({ referredPost: referredPost, 'commentedBy._id': commentedBy }, function (err, results) {
			if (err) {
				return err;
			} else if (results === null) {
				return res.status(404).send('Comments not found!');
			}

			res.send({ comments: results });
		});
	},
	listLengthByOneUser: function listLengthByOneUser(req, res) {
		var commentedBy = req.params.commentedBy;

		_commentsServer2.default.find({ 'commentedBy._id': commentedBy }).count(function (err, count) {
			if (err) {
				return err;
			}

			res.send({ commentsLength: count });
		});
	},
	listOne: function listOne(req, res) {
		var id = req.params.id;

		_commentsServer2.default.findById(id, function (err, result) {
			if (err) {
				return err;
			} else if (result === null) {
				return res.status(404).send('Comment not found!');
			}

			res.send({ comment: result });
		});
	},
	post: function post(req, res) {
		var comment = new _commentsServer2.default(req.body);
		comment.save(function (err) {
			if (err) {
				console.log(err);
			}

			res.send('Comment saved.');
		});
	},
	updateReactions: function updateReactions(req, res) {
		var id = req.params.id;

		_commentsServer2.default.findByIdAndUpdate(id, { reactions: req.body.reactions }, function (err) {
			if (err) {
				console.log(err);
			};

			res.send("Comment updated");
		});
	},
	removeOne: function removeOne(req, res) {
		var id = req.params.id;

		_commentsServer2.default.findByIdAndRemove(id, function (err, result) {
			if (err) {
				return err;
			} else if (result === null) {
				return res.status(404).send('Comment not found!');
			}

			res.send("Comment deleted.");
		});
	},
	removeByReferredPost: function removeByReferredPost(req, res) {
		var referredPost = req.params.referredPost;

		_commentsServer2.default.remove({ referredPost: referredPost }, function (err, result) {
			if (err) {
				return err;
			}

			res.send("Comments deleted.");
		});
	}
};

exports.default = commentControls;