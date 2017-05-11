'use strict';

(function () {
	'use strict';

	angular.module('shared').directive('sharedAddTechnologyHandles', sharedAddTechnologyHandles);

	function sharedAddTechnologyHandles() {

		var directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-add-technology-handles.client.view.html',
			controller: 'SharedAddTechnologyHandlesController'
		};

		return directive;
	}
})();