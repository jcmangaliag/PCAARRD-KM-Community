(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('addEventPost', addEventPost);


	function addEventPost () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-event-post.client.view.html',
			controller: 'AddPostController'
		}

		return directive;
	}

})();