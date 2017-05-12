(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('communityLandingPage', communityLandingPage);


	function communityLandingPage () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/views/community-landing-page.client.view.html'
		}

		return directive;
	}

})();

