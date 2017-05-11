'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose$Schema;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PostSchema = _mongoose2.default.Schema((_mongoose$Schema = {
	category: {
		type: String,
		required: true
	},
	groupBelonged: {
		type: String,
		required: true
	},
	postedBy: {
		type: Object,
		required: true
	},
	datePosted: {
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
	showPublic: {
		type: Boolean,
		required: true
	},
	files: Array,
	technologyHandles: Array,
	question: String,
	description: String,
	adTitle: String,
	details: String,
	post: String,
	newsTitle: String,
	authors: Array,
	newsBody: String,
	price: String,
	mediaTitle: String,
	mediaType: String,
	urls: Array,
	reportTitle: String,
	dateTime: String,
	location: String
}, _defineProperty(_mongoose$Schema, 'details', String), _defineProperty(_mongoose$Schema, 'eventName', String), _defineProperty(_mongoose$Schema, 'startDateTime', String), _defineProperty(_mongoose$Schema, 'endDateTime', String), _defineProperty(_mongoose$Schema, 'audience', String), _mongoose$Schema));

exports.default = _mongoose2.default.model('Post', PostSchema);