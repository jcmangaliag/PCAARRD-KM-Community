'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _groupsClassificationServer = require('../controllers/groups-classification.server.controller');

var _groupsClassificationServer2 = _interopRequireDefault(_groupsClassificationServer);

var _groupsServer = require('../controllers/groups.server.controller');

var _groupsServer2 = _interopRequireDefault(_groupsServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupsRoutes = function groupsRoutes(app) {

  app.route('/api/groups/classifications').get(_groupsClassificationServer2.default.list).post(_groupsClassificationServer2.default.post);

  app.route('/api/groups/classifications/:id').put(_groupsClassificationServer2.default.updateOne).delete(_groupsClassificationServer2.default.removeOne);

  app.route('/api/groups').get(_groupsServer2.default.list).post(_groupsServer2.default.post);

  app.route('/api/groups/my-groups/:userID').get(_groupsServer2.default.listByMyGroups);

  app.route('/api/groups/discover-groups/:userID').get(_groupsServer2.default.listByDiscoverGroups);

  app.route('/api/groups/:handle').get(_groupsServer2.default.listOne).put(_groupsServer2.default.updateOne).delete(_groupsServer2.default.removeOne);

  app.route('/api/groups/some/:handles').get(_groupsServer2.default.listSome);

  app.route('/api/groups/administered/:userID').get(_groupsServer2.default.listAdministeredGroups);

  app.route('/api/groups/pending/:userID').get(_groupsServer2.default.listPendingGroups);

  app.route('/api/groups/search/all').get(_groupsServer2.default.listByGroupSearch);

  app.route('/api/groups/:handle/add-admin/:userID').put(_groupsServer2.default.addAdmin);

  app.route('/api/groups/:handle/remove-admin/:userID').put(_groupsServer2.default.removeAdmin);

  app.route('/api/groups/:handle/add-to-pending-members/:userID').put(_groupsServer2.default.addToPendingMembers);

  app.route('/api/groups/:handle/remove-from-pending-members/:userID').put(_groupsServer2.default.removeFromPendingMembers);
};

exports.default = groupsRoutes;