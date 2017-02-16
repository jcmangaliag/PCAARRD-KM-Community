import angular from 'angular';
import coreModule from './core.client.packages';
import font_awesome from "font-awesome-sass-loader";

(function () {
	'use strict';

	angular.module('core', [
		'home', 
		'groups', 
		'layout', 
		'posts', 
		'comments', 
		'shared'
	]);
	
	angular.bootstrap(document, ['core']);
})();
