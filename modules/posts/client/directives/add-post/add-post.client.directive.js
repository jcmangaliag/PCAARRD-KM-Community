(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('addPost', addPost);


	function addPost () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-post.client.view.html'
		}

		return directive;
	}

})();

