import angular from 'angular';
import coreModule from './core.client.packages';

(function () {
	'use strict';

	angular.module('core', [
		'groups', 
		'layout', 
		'shared',
		'users'
	]);
	
	angular.bootstrap(document, ['core']);

})();

