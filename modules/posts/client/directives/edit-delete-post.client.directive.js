(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('editDeletePost', editDeletePost);

	function editDeletePost () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/edit-delete-post.client.view.html'
		}

		return directive;
	}

})();

