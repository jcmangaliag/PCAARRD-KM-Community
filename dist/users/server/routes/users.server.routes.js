'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _usersServer = require('../models/users.server.model');

var _usersServer2 = _interopRequireDefault(_usersServer);

var _usersAuthenticationServer = require('../controllers/users-authentication.server.controller');

var _usersAuthenticationServer2 = _interopRequireDefault(_usersAuthenticationServer);

var _usersServer3 = require('../controllers/users.server.controller');

var _usersServer4 = _interopRequireDefault(_usersServer3);

var _usersServer5 = require('../config/users.server.passport');

var _usersServer6 = _interopRequireDefault(_usersServer5);

var _nodeEnvFile = require('node-env-file');

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _nodeEnvFile2.default)(__dirname + ' /../../../../.env');

var usersRoutes = function usersRoutes(app) {

  app.route('/api/users/register/').post(_usersAuthenticationServer2.default.register);

  app.route('/api/users/login/').post(_usersAuthenticationServer2.default.login);

  app.route('/api/users/allow-admin-registration').post(_usersAuthenticationServer2.default.allowAdminRegistration);

  app.route('/api/users').get(_usersServer4.default.list);

  app.route('/api/users/:userID').get(_usersServer4.default.listOne).put(_usersServer4.default.updateOne);

  app.route('/api/users/group/:groupHandle').get(_usersServer4.default.listByGroup);

  app.route('/api/users/group-adminstrators/:groupAdminsID').get(_usersServer4.default.listByGroupAdminstrators);

  app.route('/api/users/group-pending-members/:groupPendingMembersID').get(_usersServer4.default.listByGroupPendingMembers);

  app.route('/api/users/:userID/join-group/:groupHandle').put(_usersServer4.default.joinGroup);

  app.route('/api/users/:userID/leave-group/:groupHandle').put(_usersServer4.default.leaveGroup);
};

exports.default = usersRoutes;