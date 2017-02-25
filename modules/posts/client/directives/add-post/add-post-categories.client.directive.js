(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('addPostCategories', addPostCategories);


	function addPostCategories () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-post-categories.client.view.html',
			controller: 'AddPostCategoriesController'
		}

		return directive;
	}

})();

