(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('deletePost', deletePost);

	function deletePost () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/views/delete-post.client.view.html'
		}

		return directive;
	}

})();

