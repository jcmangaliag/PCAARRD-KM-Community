'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('searchPosts', searchPosts);

	function searchPosts() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/search-posts.client.view.html'
		};

		return directive;
	}
})();