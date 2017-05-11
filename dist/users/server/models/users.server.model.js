'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = _mongoose2.default.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	hash: String,
	salt: String,
	name: {
		type: Object,
		required: true
	},
	isAdmin: {
		type: Boolean,
		required: true
	},
	photo: Object,
	dateJoined: {
		type: String,
		required: true
	},
	sex: {
		type: String,
		required: true
	},
	birthdate: {
		type: String,
		required: true
	},
	contactNumber: String,
	country: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	about: String,
	groupsJoined: Array
});

UserSchema.methods.setPassword = function (password) {
	this.salt = _crypto2.default.randomBytes(16).toString('hex');
	this.hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = _crypto2.default.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return _jsonwebtoken2.default.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		isAdmin: this.isAdmin,
		exp: parseInt(expiry.getTime() / 1000)
	}, "MY_SECRET");
};

exports.default = _mongoose2.default.model('User', UserSchema);