import uiRouter from 'angular-ui-router';

(function () {
	'use strict';

	angular.module('home.services', []);
	angular.module('home.controllers', ['home.services']);
	angular.module('home.routes', [uiRouter, 'home.controllers', 'layout.directives']);

})();