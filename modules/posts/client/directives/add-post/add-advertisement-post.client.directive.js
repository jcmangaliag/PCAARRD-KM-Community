(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('addAdvertisementPost', addAdvertisementPost);


	function addAdvertisementPost () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-advertisement-post.client.view.html',
			controller: 'AddPostController'
		}

		return directive;
	}

})();

