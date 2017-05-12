(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedAddTechnologyHandles', sharedAddTechnologyHandles);

	function sharedAddTechnologyHandles () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/views/shared-add-technology-handles.client.view.html',
			controller: 'SharedAddTechnologyHandlesController'
		}

		return directive;
	}

})();

