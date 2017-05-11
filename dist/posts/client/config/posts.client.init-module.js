'use strict';

var _angularUiRouter = require('angular-ui-router/release/angular-ui-router.min');

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

var _angularjsDatetimePicker = require('angularjs-datetime-picker-v2/angularjs-datetime-picker.css');

var _angularjsDatetimePicker2 = _interopRequireDefault(_angularjsDatetimePicker);

var _angularjsDatetimePickerMin = require('angularjs-datetime-picker-v2/angularjs-datetime-picker.min.js');

var _angularjsDatetimePickerMin2 = _interopRequireDefault(_angularjsDatetimePickerMin);

var _angularEllipsisMin = require('angular-ellipsis/src/angular-ellipsis.min.js');

var _angularEllipsisMin2 = _interopRequireDefault(_angularEllipsisMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('posts', ['comments', _angularUiRouter2.default, 'angularjs-datetime-picker', 'dibari.angular-ellipsis']);
})();