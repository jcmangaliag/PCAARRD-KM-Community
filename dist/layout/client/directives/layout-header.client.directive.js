'use strict';

(function () {
	'use strict';

	angular.module('layout').directive('layoutHeader', layoutHeader);

	function layoutHeader() {

		var directive = {
			restrict: 'E',
			templateUrl: '/layout/client/views/layout-header.client.view.html',
			controller: 'HeaderController'
		};

		return directive;
	}
})();