'use strict';

(function () {
	'use strict';

	angular.module('shared').directive('sharedAddPhoto', sharedAddPhoto);

	function sharedAddPhoto() {

		var directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-add-photo.client.view.html',
			scope: {
				selectedUploadPhoto: '='
			}
		};

		return directive;
	}
})();