'use strict';

(function () {
	'use strict';

	angular.module('groups').controller('ViewGroupsCategoriesController', ViewGroupsCategoriesController);

	ViewGroupsCategoriesController.$inject = ['$scope', 'ViewGroupsCategoriesService'];

	function ViewGroupsCategoriesController($scope, ViewGroupsCategoriesService) {
		var setCurrentViewGroupsCategory = ViewGroupsCategoriesService.setCurrentViewGroupsCategory;

		$scope.setCurrentViewGroupsCategory = _.partial(setCurrentViewGroupsCategory);
		$scope.currentViewGroupsCategory = ViewGroupsCategoriesService.getCurrentViewGroupsCategory();
		$scope.viewGroupsCategories = ViewGroupsCategoriesService.getViewGroupsCategories();
	}
})();