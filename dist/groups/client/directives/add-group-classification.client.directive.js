'use strict';

(function () {
	'use strict';

	angular.module('groups').directive('addGroupClassification', addGroupClassification);

	function addGroupClassification() {

		var directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/add-group-classification.client.view.html'
		};

		return directive;
	}
})();