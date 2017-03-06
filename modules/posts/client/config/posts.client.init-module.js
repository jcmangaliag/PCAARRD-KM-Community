import uiRouter from 'angular-ui-router';
import datepickerCSS from 'angularjs-datetime-picker-v2/angularjs-datetime-picker.css';
import datepickerJS from 'angularjs-datetime-picker-v2/angularjs-datetime-picker.min.js';
import angularEllipsis from 'angular-ellipsis/src/angular-ellipsis.min.js';

(function () {
	'use strict';

	angular.module('posts', [uiRouter, 'angularjs-datetime-picker', 'dibari.angular-ellipsis']);

})();