'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('User');

var userAuthControls = {
	register: function register(req, res) {
		var user = new User(req.body.userFormData);
		user.setPassword(req.body.password);
		if (req.body.enteredKey) {
			if (process.env.ADMIN_REG_ACCESS_HASH !== _crypto2.default.pbkdf2Sync(req.body.enteredKey, process.env.ADMIN_REG_ACCESS_SALT, 1000, 64).toString('hex')) {
				res.status(401).json({ message: 'Invalid Access Key!' });
				return;
			}
		}

		user.save(function (err) {
			if (err) {
				return err;
			}

			var token = user.generateJwt();
			res.status(200).json({ "token": token });
		});
	},
	login: function login(req, res) {
		_passport2.default.authenticate('local', function (err, user, info) {
			// If Passport throws/catches an error
			if (err) {
				res.status(404).json(err);
				return;
			}

			// If a user is found
			if (user) {
				var token = user.generateJwt();
				res.status(200).json({ "token": token });
			} else {
				// If user is not found
				res.status(401).json(info);
			}
		})(req, res);
	},
	allowAdminRegistration: function allowAdminRegistration(req, res) {
		var enteredHash = _crypto2.default.pbkdf2Sync(req.body.enteredKey, process.env.ADMIN_REG_ACCESS_SALT, 1000, 64).toString('hex');
		if (enteredHash === process.env.ADMIN_REG_ACCESS_HASH) {
			res.status(200).json({ "allow": true });
		} else {
			res.status(401).json({ "allow": false });
		}
	}
};

exports.default = userAuthControls;