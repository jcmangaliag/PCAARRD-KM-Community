import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('layout')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope'];

	function HeaderController ($scope, $state) {
		$scope.options = {
			showOptions: false
		}

		$scope.toggleOptions = () =>{
			$scope.options.showOptions = !$scope.options.showOptions;
		}
	}

})();