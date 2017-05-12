(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('ViewPostsCategoriesController', ViewPostsCategoriesController);

	ViewPostsCategoriesController.$inject = ['$scope', '$stateParams', 'ViewPostsCategoriesService', 'UserAuthenticationService'];

	function ViewPostsCategoriesController ($scope, $stateParams, ViewPostsCategoriesService, UserAuthenticationService) {
		const {setCurrentViewPostsCategory} = ViewPostsCategoriesService;
		$scope.setCurrentViewPostsCategory = _.partial(setCurrentViewPostsCategory);
		$scope.currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory();
		$scope.viewPostsCategories = ViewPostsCategoriesService.getViewPostsCategories();
	}

})();