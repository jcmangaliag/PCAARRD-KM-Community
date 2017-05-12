(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('addOthersPost', addOthersPost);


	function addOthersPost () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/views/add-post/add-others-post.client.view.html',
			controller: 'AddPostController'
		}

		return directive;
	}

})();