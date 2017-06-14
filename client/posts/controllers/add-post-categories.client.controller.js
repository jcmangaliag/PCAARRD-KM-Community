(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('AddPostCategoriesController', AddPostCategoriesController);

	AddPostCategoriesController.$inject = ['$scope', 'AddPostCategoriesService'];

	function AddPostCategoriesController ($scope, AddPostCategoriesService) {
		const {setCurrentAddPostCategory} = AddPostCategoriesService;
		$scope.setCurrentAddPostCategory = _.partial(setCurrentAddPostCategory);	// sets the selected add post category
		$scope.currentAddPostCategory = AddPostCategoriesService.getCurrentAddPostCategory();	// gets the selected add post category
		$scope.addPostCategories = AddPostCategoriesService.getAddPostCategories();	// gets all the add post categories
	}

})();