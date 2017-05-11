'use strict';

(function () {
	'use strict';

	angular.module('shared').directive('sharedViewFiles', sharedViewFiles);

	function sharedViewFiles() {

		var directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-view-files.client.view.html',
			scope: {
				selectedFiles: '='
			}
		};

		return directive;
	}
})();