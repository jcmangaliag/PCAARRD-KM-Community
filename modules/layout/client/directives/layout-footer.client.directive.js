(() => {
	'use strict';
	
	angular
		.module('layout.directives')
		.directive('layoutFooter', layoutFooter);

	function layoutFooter () {

		const directive = {
			restrict: 'E',
			templateUrl: '/layout/client/views/layout-footer.client.view.html'
		}

		return directive;
	}

})();

