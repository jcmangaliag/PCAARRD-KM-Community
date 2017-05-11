'use strict';

(function () {
	'use strict';

	angular.module('posts').controller('AddPostCategoriesController', AddPostCategoriesController);

	AddPostCategoriesController.$inject = ['$scope', 'AddPostCategoriesService'];

	function AddPostCategoriesController($scope, AddPostCategoriesService) {
		var setCurrentAddPostCategory = AddPostCategoriesService.setCurrentAddPostCategory;

		$scope.setCurrentAddPostCategory = _.partial(setCurrentAddPostCategory);
		$scope.currentAddPostCategory = AddPostCategoriesService.getCurrentAddPostCategory();
		$scope.addPostCategories = AddPostCategoriesService.getAddPostCategories();
	}
})();