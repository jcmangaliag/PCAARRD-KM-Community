(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('ViewGroupsCategoriesController', ViewGroupsCategoriesController);

	ViewGroupsCategoriesController.$inject = ['$scope', 'ViewGroupsCategoriesService'];

	function ViewGroupsCategoriesController ($scope, ViewGroupsCategoriesService) {
		const {setCurrentViewGroupsCategory} = ViewGroupsCategoriesService;
		$scope.setCurrentViewGroupsCategory = _.partial(setCurrentViewGroupsCategory);	// sets the current category and the appropriate data
		$scope.currentViewGroupsCategory = ViewGroupsCategoriesService.getCurrentViewGroupsCategory();	// current group category
		$scope.viewGroupsCategories = ViewGroupsCategoriesService.getViewGroupsCategories();	// all group categories
	}

})();