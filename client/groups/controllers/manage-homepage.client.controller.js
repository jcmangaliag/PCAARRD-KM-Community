import _ from 'lodash/lodash.min';

(() => {
	'use strict';

	angular
		.module('groups')
		.controller('ManageHomepageController', ManageHomepageController);

	ManageHomepageController.$inject = ['$scope', 'HomepageService'];

	function ManageHomepageController ($scope, HomepageService) {

		/**
		 * Properties
		 */
		$scope.sliders = [];

		/**
		 * Methods
		 */
		// Fetch slides from server
		HomepageService.getSliders()
			.then((result) => {
				$scope.sliders = result;
			});
	}

})();
