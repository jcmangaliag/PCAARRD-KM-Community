'use strict';

(function () {
	'use strict';

	angular.module('shared').directive('sharedAddHashtags', sharedAddHashtags);

	function sharedAddHashtags() {

		var directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-add-hashtags.client.view.html',
			controller: 'SharedAddHashtagsController'
		};

		return directive;
	}
})();