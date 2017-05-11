'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postsServer = require('../controllers/posts.server.controller');

var _postsServer2 = _interopRequireDefault(_postsServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postsRoutes = function postsRoutes(app) {

  app.route('/api/posts').get(_postsServer2.default.list).post(_postsServer2.default.post);

  app.route('/api/posts/category/:category').get(_postsServer2.default.listByCategory);

  app.route('/api/posts/group-belonged/:handle').get(_postsServer2.default.listByGroupBelonged);

  app.route('/api/posts/group-belonged/:handle/category/:category').get(_postsServer2.default.listByGroupBelongedAndCategory);

  app.route('/api/posts/my-groups/:myGroups').get(_postsServer2.default.listByMyGroups);

  app.route('/api/posts/my-groups/:myGroups/category/:category').get(_postsServer2.default.listByMyGroupsAndCategory);

  app.route('/api/posts/user/:userID').get(_postsServer2.default.listByUser);

  app.route('/api/posts/user/:userID/length').get(_postsServer2.default.listLengthByUser);

  app.route('/api/posts/user/:userID/category/:category').get(_postsServer2.default.listByUserAndCategory);

  app.route('/api/posts/:id').get(_postsServer2.default.listOne).delete(_postsServer2.default.removeOne);

  app.route('/api/posts/reactions/:id').put(_postsServer2.default.updateReactions);
};

exports.default = postsRoutes;