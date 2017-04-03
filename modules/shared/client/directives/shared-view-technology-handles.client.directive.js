(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedViewTechnologyHandles', sharedViewTechnologyHandles);

	function sharedViewTechnologyHandles () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-view-technology-handles.client.view.html',
			scope: {
				selectedTechnologyHandles: '='
			}
		}

		return directive;
	}

})();

