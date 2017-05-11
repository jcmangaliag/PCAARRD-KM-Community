'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('User');

_passport2.default.use(new _passportLocal.Strategy({
  usernameField: 'email'
}, function (username, password, done) {
  User.findOne({ email: username }, function (err, user) {
    if (err) {
      return done(err);
    }
    // Return if user not found in database
    if (!user) {
      return done(null, false, {
        message: 'User not found'
      });
    }
    // Return if password is wrong
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Incorrect Password'
      });
    }
    // If credentials are correct, return the user object
    return done(null, user);
  });
}));