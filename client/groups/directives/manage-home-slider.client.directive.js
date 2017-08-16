(() => {
	'use strict';

	angular
		.module('groups')
		.directive('manageHomeSlider', manageHomeSlider);


	function manageHomeSlider () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/views/manage-home-slider.client.view.html'
		}

		return directive;
	}

})();
