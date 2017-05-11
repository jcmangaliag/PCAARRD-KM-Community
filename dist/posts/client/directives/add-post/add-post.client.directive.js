'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('addPost', addPost);

	function addPost() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-post.client.view.html'
		};

		return directive;
	}
})();