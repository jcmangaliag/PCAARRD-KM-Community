(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('viewAllQuestionPosts', viewAllQuestionPosts);


	function viewAllQuestionPosts () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/views/view-posts/view-all-question-posts.client.view.html'
		}

		return directive;
	}

})();

