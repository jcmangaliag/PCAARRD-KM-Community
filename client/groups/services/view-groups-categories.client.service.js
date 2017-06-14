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

		let currentViewGroupsCategory = {	// selected group category
			category: viewGroupsCategories[0]
		}

		let userID = null;

		const getViewGroupsCategories = () => {	// returns the group categories
			if (userID === "none") {
				return ["All Groups"];
			} else {
				return viewGroupsCategories;
			}
		}

		const getCurrentViewGroupsCategory = () => {	// returns the selected group category
			if (userID === "none") {
				return {category: viewGroupsCategories[0]};
			} else {
				return currentViewGroupsCategory;
			}
		}

		const setCurrentViewGroupsCategory = (category) => {	// changes selected group category and loads appropriate groups
			currentViewGroupsCategory.category = category;
			retrieveGroupsByCategory(currentViewGroupsCategory.category);
		}

		const setUserID = (userid) => {
			userID = userid;
		}

		const retrieveGroupsByCategory = (category) => {	// loads a set of groups depending on the selected group category
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
					GroupService.getMyGroups(userID)
					.then((results) => {
						deferred.resolve();
					}, (error) => {
						// posts not found
						deferred.reject(error);
					});
					break;
				case "Discover Groups":
					GroupService.getDiscoverGroups(userID)
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
			setUserID,
			retrieveGroupsByCategory
		};
	}

})();

