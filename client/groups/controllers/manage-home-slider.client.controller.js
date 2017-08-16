import _ from 'lodash/lodash.min';

(() => {
	'use strict';

	angular
		.module('groups')
		.controller('ManageHomeSliderController', ManageHomeSliderController);

	ManageHomeSliderController.$inject = ['$scope', 'SliderService'];

	function ManageHomeSliderController ($scope, SliderService) {

		/**
		 * Properties
		 */
		$scope.sliders = [];
		$scope.toggleAddSlide = true;
		$scope.toggleAddActionButton = false;

		/**
		 * Methods
		 */
		// Fetch slides from server
		SliderService.getSliders()
			.then((result) => {
				$scope.sliders = result;
			});
	}

})();
