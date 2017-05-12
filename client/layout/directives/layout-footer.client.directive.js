(() => {
	'use strict';
	
	angular
		.module('layout')
		.directive('layoutFooter', layoutFooter);

	function layoutFooter () {

		const directive = {
			restrict: 'E',
			templateUrl: '/layout/views/layout-footer.client.view.html'
		}

		return directive;
	}

})();

