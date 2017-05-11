'use strict';

(function () {
	'use strict';

	angular.module('shared').directive('sharedResetSubmitButtons', sharedResetSubmitButtons);

	function sharedResetSubmitButtons() {

		var directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-reset-submit-buttons.client.view.html'
		};

		return directive;
	}
})();