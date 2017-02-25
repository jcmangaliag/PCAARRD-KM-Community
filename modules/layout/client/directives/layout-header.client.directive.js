(() => {
	'use strict';
	
	angular
		.module('layout')
		.directive('layoutHeader', layoutHeader);


	function layoutHeader () {

		const directive = {
			restrict: 'E',
			templateUrl: '/layout/client/views/layout-header.client.view.html'
		}

		return directive;
	}

})();

