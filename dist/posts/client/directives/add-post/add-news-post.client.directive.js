'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('addNewsPost', addNewsPost);

	function addNewsPost() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-news-post.client.view.html',
			controller: 'AddPostController'
		};

		return directive;
	}
})();