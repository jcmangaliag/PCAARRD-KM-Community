(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('viewPostsCategories', viewPostsCategories);


	function viewPostsCategories () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-posts-categories.client.view.html',
			controller: 'ViewPostsCategoriesController'
		}

		return directive;
	}

})();

