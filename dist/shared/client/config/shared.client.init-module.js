'use strict';

var _fontAwesomeSassLoader = require('font-awesome-sass-loader');

var _fontAwesomeSassLoader2 = _interopRequireDefault(_fontAwesomeSassLoader);

var _ngToast = require('ng-toast/dist/ngToast.min');

var _ngToast2 = _interopRequireDefault(_ngToast);

var _ngToastMin = require('ng-toast/dist/ngToast.min.css');

var _ngToastMin2 = _interopRequireDefault(_ngToastMin);

var _ngToastAnimationsMin = require('ng-toast/dist/ngToast-animations.min.css');

var _ngToastAnimationsMin2 = _interopRequireDefault(_ngToastAnimationsMin);

var _angularSanitize = require('angular-sanitize/angular-sanitize.min');

var _angularSanitize2 = _interopRequireDefault(_angularSanitize);

var _angularAnimate = require('angular-animate/angular-animate.min');

var _angularAnimate2 = _interopRequireDefault(_angularAnimate);

var _emojiMin = require('angular-emoji-filter-hd/dist/emoji.min.css');

var _emojiMin2 = _interopRequireDefault(_emojiMin);

var _emoji = require('angular-emoji-filter-hd/dist/emoji.min');

var _emoji2 = _interopRequireDefault(_emoji);

var _angularUiRouterTitle = require('angular-ui-router-title/angular-ui-router-title.js');

var _angularUiRouterTitle2 = _interopRequireDefault(_angularUiRouterTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('shared', ['ngToast', 'ngAnimate', 'ngSanitize', 'dbaq.emoji', 'ui.router.title']);
})();