'use strict';

(function () {
	'use strict';

	angular.module('groups').directive('communityLandingPage', communityLandingPage);

	function communityLandingPage() {

		var directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/community-landing-page.client.view.html'
		};

		return directive;
	}
})();