(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedAddFiles', sharedAddFiles);

	function sharedAddFiles () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-add-files.client.view.html'
		}

		return directive;
	}

})();

