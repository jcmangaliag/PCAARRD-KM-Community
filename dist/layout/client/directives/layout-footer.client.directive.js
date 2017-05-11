'use strict';

(function () {
	'use strict';

	angular.module('layout').directive('layoutFooter', layoutFooter);

	function layoutFooter() {

		var directive = {
			restrict: 'E',
			templateUrl: '/layout/client/views/layout-footer.client.view.html'
		};

		return directive;
	}
})();