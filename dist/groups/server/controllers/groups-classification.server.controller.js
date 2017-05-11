'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _groupsClassificationServer = require('../models/groups-classification.server.model');

var _groupsClassificationServer2 = _interopRequireDefault(_groupsClassificationServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupClassificationControls = {
	list: function list(req, res) {
		_groupsClassificationServer2.default.find(function (err, results) {
			if (err) {
				return err;
			}

			res.send({ groupClassifications: results });
		});
	},
	post: function post(req, res) {
		var classification = new _groupsClassificationServer2.default(req.body);
		classification.save(function (err) {
			if (err) {
				return err;
			}

			res.send('Group Classification saved.');
		});
	},
	updateOne: function updateOne(req, res) {
		var id = req.params.id;

		_groupsClassificationServer2.default.findByIdAndUpdate(id, { $set: req.body }, function (err) {
			if (err) {
				return err;
			}

			res.send("Group Classification updated.");
		});
	},
	removeOne: function removeOne(req, res) {
		var id = req.params.id;

		_groupsClassificationServer2.default.findByIdAndRemove(id, function (err, result) {
			if (err) {
				return err;
			}

			res.send("Group Classification deleted.");
		});
	}
};

exports.default = groupClassificationControls;