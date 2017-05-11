'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _coreServer = require('./config/core.server.app-config');

var _coreServer2 = _interopRequireDefault(_coreServer);

var _coreServer3 = require('./config/core.server.db');

var _coreServer4 = _interopRequireDefault(_coreServer3);

var _coreServer5 = require('./routes/core.server.routes');

var _coreServer6 = _interopRequireDefault(_coreServer5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname + ' /../client/assets', 'images', 'favicon.ico')));
app.use(_bodyParser2.default.json());
app.use(_passport2.default.initialize());

(0, _coreServer6.default)(app);

app.use(_express2.default.static(__dirname + ' /../../'));
app.use(_express2.default.static(__dirname + ' /../../../uploads'));

app.all('/*', function (req, res) {
	res.sendFile(_path2.default.join(__dirname + '/../client/base-view/core-content.client.view.html'));
});

app.listen(_coreServer2.default.port, function () {
	console.log('Server running on ' + _coreServer2.default.host + ':' + _coreServer2.default.port);
});