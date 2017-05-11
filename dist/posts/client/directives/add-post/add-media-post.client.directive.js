'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('addMediaPost', addMediaPost);

	function addMediaPost() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-media-post.client.view.html',
			controller: 'AddPostController'
		};

		return directive;
	}
})();