(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('searchPosts', searchPosts);

	function searchPosts () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/views/search-posts.client.view.html'
		}

		return directive;
	}

})();

