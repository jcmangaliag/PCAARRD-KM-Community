import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('home')
		.controller('LoggedInHomeController', LoggedInHomeController);

	LoggedInHomeController.$inject = ['$scope', 'LoggedInHomeService'];

	function LoggedInHomeController ($scope, LoggedInHomeService) {

	}

})();