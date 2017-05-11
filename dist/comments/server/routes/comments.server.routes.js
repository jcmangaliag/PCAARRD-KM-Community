'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commentsServer = require('../controllers/comments.server.controller');

var _commentsServer2 = _interopRequireDefault(_commentsServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentsRoutes = function commentsRoutes(app) {

  app.route('/api/comments').get(_commentsServer2.default.list).post(_commentsServer2.default.post);

  app.route('/api/comments/:id').get(_commentsServer2.default.listOne).delete(_commentsServer2.default.removeOne);

  app.route('/api/comments/referredPost/:referredPost').get(_commentsServer2.default.listByReferredPost).delete(_commentsServer2.default.removeByReferredPost);

  app.route('/api/comments/groupBelonged/:groupBelonged/length').get(_commentsServer2.default.listLengthByGroupBelonged);

  app.route('/api/comments/referredPost/:referredPost/commentedBy/:commentedBy').get(_commentsServer2.default.listByUserComments);

  app.route('/api/comments/commentedBy/:commentedBy/length').get(_commentsServer2.default.listLengthByOneUser);

  app.route('/api/comments/reactions/:id').put(_commentsServer2.default.updateReactions);
};

exports.default = commentsRoutes;