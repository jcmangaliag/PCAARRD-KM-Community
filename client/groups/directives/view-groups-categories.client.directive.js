(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('viewGroupsCategories', viewGroupsCategories);


	function viewGroupsCategories () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/views/view-groups-categories.client.view.html',
			controller: 'ViewGroupsCategoriesController'
		}

		return directive;
	}

})();

