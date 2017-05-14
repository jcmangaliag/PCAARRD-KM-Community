'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _usersServer=require('../models/users.server.model'),_usersServer2=_interopRequireDefault(_usersServer),_usersAuthenticationServer=require('../controllers/users-authentication.server.controller'),_usersAuthenticationServer2=_interopRequireDefault(_usersAuthenticationServer),_usersServer3=require('../controllers/users.server.controller'),_usersServer4=_interopRequireDefault(_usersServer3),_usersServer5=require('../config/users.server.passport'),_usersServer6=_interopRequireDefault(_usersServer5),_nodeEnvFile=require('node-env-file'),_nodeEnvFile2=_interopRequireDefault(_nodeEnvFile);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}(0,_nodeEnvFile2.default)(__dirname+' /../../../../.env');var usersRoutes=function(a){a.route('/api/users/register/').post(_usersAuthenticationServer2.default.register),a.route('/api/users/login/').post(_usersAuthenticationServer2.default.login),a.route('/api/users/allow-admin-registration').post(_usersAuthenticationServer2.default.allowAdminRegistration),a.route('/api/users').get(_usersServer4.default.list),a.route('/api/users/:userID').get(_usersServer4.default.listOne).put(_usersServer4.default.updateOne),a.route('/api/users/group/:groupHandle').get(_usersServer4.default.listByGroup),a.route('/api/users/group-adminstrators/:groupAdminsID').get(_usersServer4.default.listByGroupAdminstrators),a.route('/api/users/group-pending-members/:groupPendingMembersID').get(_usersServer4.default.listByGroupPendingMembers),a.route('/api/users/:userID/join-group/:groupHandle').put(_usersServer4.default.joinGroup),a.route('/api/users/:userID/leave-group/:groupHandle').put(_usersServer4.default.leaveGroup)};exports.default=usersRoutes;
//# sourceMappingURL=users.server.routes.js.map