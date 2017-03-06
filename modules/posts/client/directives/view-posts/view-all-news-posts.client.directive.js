(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('viewAllNewsPosts', viewAllNewsPosts);


	function viewAllNewsPosts () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-all-news-posts.client.view.html'
		}

		return directive;
	}

})();

