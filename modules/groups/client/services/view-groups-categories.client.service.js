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

		let userID = null;

		const getViewGroupsCategories = () => {
			if (userID === "none") {
				return ["All Groups"];
			} else {
				return viewGroupsCategories;
			}
		}

		const getCurrentViewGroupsCategory = () => {
			if (userID === "none") {
				return {category: viewGroupsCategories[0]};
			} else {
				return currentViewGroupsCategory;
			}
		}

		const setCurrentViewGroupsCategory = (category) => {
			currentViewGroupsCategory.category = category;
			retrieveGroupsByCategory(currentViewGroupsCategory.category);
		}

		const setUserID = (userid) => {
			userID = userid;
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

