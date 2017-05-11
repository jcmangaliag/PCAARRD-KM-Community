'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('addQuestionPost', addQuestionPost);

	function addQuestionPost() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-question-post.client.view.html',
			controller: 'AddPostController'
		};

		return directive;
	}
})();