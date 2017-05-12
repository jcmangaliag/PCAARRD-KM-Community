(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedAddPhoto', sharedAddPhoto);

	function sharedAddPhoto () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/views/shared-add-photo.client.view.html',
			scope: {
				selectedUploadPhoto: '='
			}
		}

		return directive;
	}

})();

