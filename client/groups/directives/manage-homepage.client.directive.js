(() => {
	'use strict';

	angular
		.module('groups')
		.directive('manageHomepage', manageHomepage);


	function manageHomepage () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/views/manage-homepage.client.view.html'
		}

		return directive;
	}

})();
