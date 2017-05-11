'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentSchema = _mongoose2.default.Schema({
	referredPost: {
		type: _mongoose2.default.Schema.Types.ObjectId,
		required: true
	},
	groupBelonged: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	commentedBy: {
		type: Object,
		required: true
	},
	dateCommented: {
		type: String,
		required: true
	},
	hashtags: {
		type: Array,
		required: true
	},
	reactions: {
		type: Array,
		required: true
	},
	technologyHandles: Array,
	files: Array
});

exports.default = _mongoose2.default.model('Comment', CommentSchema);