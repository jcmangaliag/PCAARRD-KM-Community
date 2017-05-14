'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _commentsServer=require('../controllers/comments.server.controller'),_commentsServer2=_interopRequireDefault(_commentsServer);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var commentsRoutes=function(a){a.route('/api/comments').get(_commentsServer2.default.list).post(_commentsServer2.default.post),a.route('/api/comments/:id').get(_commentsServer2.default.listOne).delete(_commentsServer2.default.removeOne),a.route('/api/comments/referredPost/:referredPost').get(_commentsServer2.default.listByReferredPost).delete(_commentsServer2.default.removeByReferredPost),a.route('/api/comments/groupBelonged/:groupBelonged/length').get(_commentsServer2.default.listLengthByGroupBelonged),a.route('/api/comments/referredPost/:referredPost/commentedBy/:commentedBy').get(_commentsServer2.default.listByUserComments),a.route('/api/comments/commentedBy/:commentedBy/length').get(_commentsServer2.default.listLengthByOneUser),a.route('/api/comments/reactions/:id').put(_commentsServer2.default.updateReactions)};exports.default=commentsRoutes;
//# sourceMappingURL=comments.server.routes.js.map