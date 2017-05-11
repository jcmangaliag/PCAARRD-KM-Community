'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('viewAllQuestionPosts', viewAllQuestionPosts);

	function viewAllQuestionPosts() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-all-question-posts.client.view.html'
		};

		return directive;
	}
})();