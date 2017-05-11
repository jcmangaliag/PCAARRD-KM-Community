'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('allPostsReactions', allPostsReactions);

	function allPostsReactions() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/all-posts-reactions.client.view.html'
		};

		return directive;
	}
})();