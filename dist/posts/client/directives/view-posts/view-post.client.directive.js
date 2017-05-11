'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('viewPost', viewPost);

	function viewPost() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-post.client.view.html',
			controller: 'PostController'
		};

		return directive;
	}
})();