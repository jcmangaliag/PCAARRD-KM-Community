(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedProgressBar', sharedProgressBar);

	function sharedProgressBar () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/views/shared-progress-bar.client.view.html'
		}

		return directive;
	}

})();

