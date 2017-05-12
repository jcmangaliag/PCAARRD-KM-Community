(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedAddFiles', sharedAddFiles);

	function sharedAddFiles () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/views/shared-add-files.client.view.html',
			controller: 'SharedAddFilesController' 
		}

		return directive;
	}

})();

