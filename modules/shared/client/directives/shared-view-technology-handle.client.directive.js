(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedViewTechnologyHandle', sharedViewTechnologyHandle);

	function sharedViewTechnologyHandle () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-view-technology-handle.client.view.html',
			scope: {
				selectedTechnologyHandle: '='
			}
		}

		return directive;
	}

})();

