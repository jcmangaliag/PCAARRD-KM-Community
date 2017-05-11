'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _postsServer = require('../../../posts/server/routes/posts.server.routes');

var _postsServer2 = _interopRequireDefault(_postsServer);

var _commentsServer = require('../../../comments/server/routes/comments.server.routes');

var _commentsServer2 = _interopRequireDefault(_commentsServer);

var _groupsServer = require('../../../groups/server/routes/groups.server.routes');

var _groupsServer2 = _interopRequireDefault(_groupsServer);

var _sharedServer = require('../../../shared/server/routes/shared.server.routes');

var _sharedServer2 = _interopRequireDefault(_sharedServer);

var _usersServer = require('../../../users/server/routes/users.server.routes');

var _usersServer2 = _interopRequireDefault(_usersServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleRoutes = function moduleRoutes(app) {
	(0, _groupsServer2.default)(app), (0, _postsServer2.default)(app), (0, _commentsServer2.default)(app), (0, _sharedServer2.default)(app), (0, _usersServer2.default)(app);
};

exports.default = moduleRoutes;