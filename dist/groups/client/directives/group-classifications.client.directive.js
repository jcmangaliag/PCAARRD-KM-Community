'use strict';

(function () {
	'use strict';

	angular.module('groups').directive('groupClassifications', groupClassifications);

	function groupClassifications() {

		var directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/group-classifications.client.view.html'
		};

		return directive;
	}
})();