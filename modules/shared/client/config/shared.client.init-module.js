import uiRouter from 'angular-ui-router';
import font_awesome from "font-awesome-sass-loader";
import angularToast from 'ng-toast';
import angularSanitize from 'angular-sanitize';
import angularAnimate from 'angular-animate';

(function () {
	'use strict';

	angular.module('shared', [uiRouter, 'ngToast', 'ngAnimate']);

})();