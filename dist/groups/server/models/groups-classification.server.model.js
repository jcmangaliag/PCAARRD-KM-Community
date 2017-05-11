'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupClassificationSchema = _mongoose2.default.Schema({
	industry: {
		type: String,
		required: true
	},
	sector: {
		type: String,
		required: true
	},
	isp: {
		type: String,
		required: true
	},
	specificCommodity: String,
	isUsed: Boolean
});

exports.default = _mongoose2.default.model('GroupClassification', GroupClassificationSchema);