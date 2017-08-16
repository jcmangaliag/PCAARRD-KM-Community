import _ from 'lodash/lodash.min';

(() => {
	'use strict';

	angular
		.module('groups')
		.controller('ManageHomeSliderController', ManageHomeSliderController);

	ManageHomeSliderController.$inject = ['$scope', 'SliderService'];

	function ManageHomeSliderController ($scope, SliderService) {
		$scope.sliders = [];

		// Fetch slides from server
		SliderService.getSliders()
			.then((result) => {
				$scope.sliders = result;
			});
	}

})();
