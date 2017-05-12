(() => {
	'use strict';
	
	angular
		.module('layout')
		.directive('layoutHeader', layoutHeader);


	function layoutHeader () {

		const directive = {
			restrict: 'E',
			templateUrl: '/layout/views/layout-header.client.view.html',
			controller: 'HeaderController'
		}

		return directive;
	}

})();

