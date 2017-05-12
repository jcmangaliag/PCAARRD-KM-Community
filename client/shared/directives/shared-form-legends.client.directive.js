(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedFormLegends', sharedFormLegends);

	function sharedFormLegends () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/views/shared-form-legends.client.view.html'
		}

		return directive;
	}

})();

