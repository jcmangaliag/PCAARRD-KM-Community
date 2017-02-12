import angular from 'angular';
import coreModule from './core.client.packages';

(function () {
	'use strict';

	angular.module('core', ['home', 'groups', 'layout', 'posts']);
	angular.bootstrap(document, ['core']);
})();
