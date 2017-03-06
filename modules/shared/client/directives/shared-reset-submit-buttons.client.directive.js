(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedResetSubmitButtons', sharedResetSubmitButtons);

	function sharedResetSubmitButtons () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-reset-submit-buttons.client.view.html'
		}

		return directive;
	}

})();

