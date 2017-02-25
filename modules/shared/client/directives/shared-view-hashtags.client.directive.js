(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedViewHashtags', sharedViewHashtags);

	function sharedViewHashtags () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-view-hashtags.client.view.html',
			scope: {
				selectedHashtags: '='
			}
		}

		return directive;
	}

})();

