import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('home')
		.factory('LoggedInHomeService', LoggedInHomeService);

	LoggedInHomeService.$inject = ['$http'];

	function LoggedInHomeService ($http) {


		return {
			
		};
	}

})();

