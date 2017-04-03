(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('ViewPostsCategoriesController', ViewPostsCategoriesController);

	ViewPostsCategoriesController.$inject = ['$scope', 'ViewPostsCategoriesService'];

	function ViewPostsCategoriesController ($scope, ViewPostsCategoriesService) {
		const {setCurrentViewPostsCategory} = ViewPostsCategoriesService;
		$scope.setCurrentViewPostsCategory = _.partial(setCurrentViewPostsCategory);
		$scope.currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory();
		$scope.viewPostsCategories = ViewPostsCategoriesService.getViewPostsCategories();
	}

})();