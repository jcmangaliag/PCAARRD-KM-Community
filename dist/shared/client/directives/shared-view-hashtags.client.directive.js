'use strict';

(function () {
	'use strict';

	angular.module('shared').directive('sharedViewHashtags', sharedViewHashtags);

	function sharedViewHashtags() {

		var directive = {
			restrict: 'E',
			templateUrl: '/shared/client/views/shared-view-hashtags.client.view.html',
			scope: {
				selectedHashtags: '='
			}
		};

		return directive;
	}
})();