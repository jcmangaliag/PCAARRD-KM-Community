(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('sharedAddHashtags', sharedAddHashtags);

	function sharedAddHashtags () {

		const directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-add-hashtags.client.view.html',
			controller: 'SharedAddHashtagsController'
		}

		return directive;
	}

})();

