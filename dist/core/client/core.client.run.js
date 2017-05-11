'use strict';

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _coreClient = require('./core.client.packages');

var _coreClient2 = _interopRequireDefault(_coreClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	_angular2.default.module('core', ['groups', 'layout', 'shared', 'users']);

	_angular2.default.bootstrap(document, ['core']);
})();