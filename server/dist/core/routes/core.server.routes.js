'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _postsServer=require('../../posts/routes/posts.server.routes'),_postsServer2=_interopRequireDefault(_postsServer),_commentsServer=require('../../comments/routes/comments.server.routes'),_commentsServer2=_interopRequireDefault(_commentsServer),_groupsServer=require('../../groups/routes/groups.server.routes'),_groupsServer2=_interopRequireDefault(_groupsServer),_sharedServer=require('../../shared/routes/shared.server.routes'),_sharedServer2=_interopRequireDefault(_sharedServer),_homepageServer=require('../../homepage/routes/homepage.server.routes'),_homepageServer2=_interopRequireDefault(_homepageServer),_usersServer=require('../../users/routes/users.server.routes'),_usersServer2=_interopRequireDefault(_usersServer);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var moduleRoutes=function(a){(0,_groupsServer2.default)(a),(0,_postsServer2.default)(a),(0,_commentsServer2.default)(a),(0,_sharedServer2.default)(a),(0,_homepageServer2.default)(a),(0,_usersServer2.default)(a)};exports.default=moduleRoutes;
//# sourceMappingURL=core.server.routes.js.map