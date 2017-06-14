(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('ViewPostsCategoriesController', ViewPostsCategoriesController);

	ViewPostsCategoriesController.$inject = ['$scope', '$stateParams', 'ViewPostsCategoriesService', 'UserAuthenticationService'];

	function ViewPostsCategoriesController ($scope, $stateParams, ViewPostsCategoriesService, UserAuthenticationService) {
		const {setCurrentViewPostsCategory} = ViewPostsCategoriesService;
		$scope.setCurrentViewPostsCategory = _.partial(setCurrentViewPostsCategory);	// sets the selected view post category and the appropriate posts
		$scope.currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory();	// gets the selected view post category
		$scope.viewPostsCategories = ViewPostsCategoriesService.getViewPostsCategories();	// gets all the view post categories
	}

})();