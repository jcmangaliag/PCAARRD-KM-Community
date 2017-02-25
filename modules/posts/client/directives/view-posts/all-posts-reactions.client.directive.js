(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('allPostsReactions', allPostsReactions);

	function allPostsReactions () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/all-posts-reactions.client.view.html'
		}

		return directive;
	}

})();

