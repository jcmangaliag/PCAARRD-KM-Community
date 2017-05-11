'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sharedServer = require('../controller/shared.server.controller');

var _sharedServer2 = _interopRequireDefault(_sharedServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sharedRoutes = function sharedRoutes(app) {

  app.route('/api/uploads/files').post(_sharedServer2.default.uploadFile);

  app.route('/api/uploads/image').post(_sharedServer2.default.uploadImage);
};

exports.default = sharedRoutes;