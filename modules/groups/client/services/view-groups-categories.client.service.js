(() => {
	'use strict';
	
	angular
		.module('groups')
		.factory('ViewGroupsCategoriesService', ViewGroupsCategoriesService);

	ViewGroupsCategoriesService.$inject = ['GroupService', '$q'];

	function ViewGroupsCategoriesService (GroupService, $q) {

		const viewGroupsCategories = [
				"All Groups",
				"My Groups",
				"Discover Groups"
		];

		let currentViewGroupsCategory = {
			category: viewGroupsCategories[0]
		}

		const getViewGroupsCategories = () => {
			return viewGroupsCategories;
		}

		const getCurrentViewGroupsCategory = () => {
			return currentViewGroupsCategory;
		}

		const setCurrentViewGroupsCategory = (category) => {
			currentViewGroupsCategory.category = category;
			retrieveGroupsByCategory(currentViewGroupsCategory.category);
		}

		const retrieveGroupsByCategory = (category) => {
			const deferred = $q.defer();

			switch (category){
				case "All Groups":
					GroupService.getAllGroups()
					.then((results) => {
						deferred.resolve();
					}, (error) => {
						// posts not found
						deferred.reject(error);
					});
					break;
				case "My Groups":
					GroupService.getMyGroups()
					.then((results) => {
						deferred.resolve();
					}, (error) => {
						// posts not found
						deferred.reject(error);
					});
					break;
				case "Discover Groups":
					GroupService.getDiscoverGroups()
					.then((results) => {
						deferred.resolve();
					}, (error) => {
						// posts not found
						deferred.reject(error);
					});
					break;
				default:
					console.log("Invalid Group Category");
					break;
			}

			return deferred.promise;
		}

		return {
			getViewGroupsCategories,
			getCurrentViewGroupsCategory,
			setCurrentViewGroupsCategory,
			retrieveGroupsByCategory
		};
	}

})();

