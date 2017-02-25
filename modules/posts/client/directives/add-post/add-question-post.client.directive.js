(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('addQuestionPost', addQuestionPost);


	function addQuestionPost () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-question-post.client.view.html',
			controller: 'AddPostController'
		}

		return directive;
	}

})();
