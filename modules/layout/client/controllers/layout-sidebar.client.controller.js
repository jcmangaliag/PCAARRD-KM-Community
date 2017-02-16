import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('layout')
		.controller('SidebarController', SidebarController);

	SidebarController.$inject = ['$scope', '$state'];

	function SidebarController ($scope, $state) {

		$scope.activeState = $state.current.name;

		console.log($state.current.name);
	}

})();