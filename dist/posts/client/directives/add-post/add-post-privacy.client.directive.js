'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('addPostPrivacy', addPostPrivacy);

	function addPostPrivacy() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-post-privacy.client.view.html'
		};

		return directive;
	}
})();