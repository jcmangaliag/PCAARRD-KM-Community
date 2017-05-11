'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('viewAllEventPosts', viewAllEventPosts);

	function viewAllEventPosts() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-all-event-posts.client.view.html'
		};

		return directive;
	}
})();