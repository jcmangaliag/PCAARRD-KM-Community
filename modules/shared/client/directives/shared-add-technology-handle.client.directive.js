(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedAddTechnologyHandle', sharedAddTechnologyHandle);

	function sharedAddTechnologyHandle () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-add-technology-handle.client.view.html',
			scope: {
				selectedTechnologyHandle: '='
			} 
		}

		return directive;
	}

})();

