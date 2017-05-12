(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('AddPostCategoriesController', AddPostCategoriesController);

	AddPostCategoriesController.$inject = ['$scope', 'AddPostCategoriesService'];

	function AddPostCategoriesController ($scope, AddPostCategoriesService) {
		const {setCurrentAddPostCategory} = AddPostCategoriesService;
		$scope.setCurrentAddPostCategory = _.partial(setCurrentAddPostCategory);
		$scope.currentAddPostCategory = AddPostCategoriesService.getCurrentAddPostCategory();
		$scope.addPostCategories = AddPostCategoriesService.getAddPostCategories();
	}

})();