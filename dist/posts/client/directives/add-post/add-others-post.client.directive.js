'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('addOthersPost', addOthersPost);

	function addOthersPost() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-others-post.client.view.html',
			controller: 'AddPostController'
		};

		return directive;
	}
})();