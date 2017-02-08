import angular from 'angular';
import coreModule from './core.client.packages';

(function () {
	'use strict';

	angular.module('core', ['home', 'groups', 'layout']);
	angular.bootstrap(document, ['core']);
})();
