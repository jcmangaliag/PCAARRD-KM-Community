'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('viewPosts', viewPosts);

	function viewPosts() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-posts.client.view.html',
			controller: 'PostController'
		};

		return directive;
	}
})();