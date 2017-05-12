(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedViewFiles', sharedViewFiles);

	function sharedViewFiles () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/views/shared-view-files.client.view.html',
			scope: {
				selectedFiles: '='
			}
		}

		return directive;
	}

})();

