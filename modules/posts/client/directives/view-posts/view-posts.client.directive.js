(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('viewPosts', viewPosts);


	function viewPosts () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-posts.client.view.html',
			controller: 'PostController'
		}

		return directive;
	}

})();

