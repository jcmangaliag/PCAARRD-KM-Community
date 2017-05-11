'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupSchema = _mongoose2.default.Schema({
	classification: {
		type: Object,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	handle: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	admin: {
		type: Array,
		required: true
	},
	membership: {
		type: String,
		required: true
	},
	photo: Object,
	coverPhoto: Object,
	dateCreated: {
		type: String,
		required: true
	},
	postsCount: {
		type: Object,
		required: true
	},
	membersCount: {
		type: Number,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	},
	pendingMembers: Array
});

exports.default = _mongoose2.default.model('Group', GroupSchema);