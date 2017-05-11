'use strict';

(function () {
	'use strict';

	angular.module('shared').directive('sharedAddFiles', sharedAddFiles);

	function sharedAddFiles() {

		var directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-add-files.client.view.html',
			controller: 'SharedAddFilesController'
		};

		return directive;
	}
})();