import angular from 'angular';
import coreModule from './core.client.packages';

(function () {
	'use strict';

	angular.module('core', [
		'shared',
		'home', 
		'groups', 
		'layout', 
		'posts', 
		'comments'
	]);
	
	angular.bootstrap(document, ['core']);

})();

