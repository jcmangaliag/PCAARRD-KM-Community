(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('viewAllAdvertisementPosts', viewAllAdvertisementPosts);


	function viewAllAdvertisementPosts () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/views/view-posts/view-all-advertisement-posts.client.view.html'
		}

		return directive;
	}

})();

