'use strict';

(function () {
	'use strict';

	angular.module('shared').directive('sharedFormLegends', sharedFormLegends);

	function sharedFormLegends() {

		var directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-form-legends.client.view.html'
		};

		return directive;
	}
})();