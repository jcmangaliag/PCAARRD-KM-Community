(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('communityFeed', communityFeed);


	function communityFeed () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/community-feed.client.view.html'
		}

		return directive;
	}

})();

