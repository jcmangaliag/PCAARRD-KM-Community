(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedHashtag', sharedHashtag);

	function sharedHashtag () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-hashtag.client.view.html',
			controller: 'SharedHashtagController'
		}

		return directive;
	}

})();

