'use strict';

(function () {
	'use strict';

	angular.module('groups').factory('ViewGroupsCategoriesService', ViewGroupsCategoriesService);

	ViewGroupsCategoriesService.$inject = ['GroupService', '$q'];

	function ViewGroupsCategoriesService(GroupService, $q) {

		var viewGroupsCategories = ["All Groups", "My Groups", "Discover Groups"];

		var currentViewGroupsCategory = {
			category: viewGroupsCategories[0]
		};

		var userID = null;

		var getViewGroupsCategories = function getViewGroupsCategories() {
			if (userID === "none") {
				return ["All Groups"];
			} else {
				return viewGroupsCategories;
			}
		};

		var getCurrentViewGroupsCategory = function getCurrentViewGroupsCategory() {
			if (userID === "none") {
				return { category: viewGroupsCategories[0] };
			} else {
				return currentViewGroupsCategory;
			}
		};

		var setCurrentViewGroupsCategory = function setCurrentViewGroupsCategory(category) {
			currentViewGroupsCategory.category = category;
			retrieveGroupsByCategory(currentViewGroupsCategory.category);
		};

		var setUserID = function setUserID(userid) {
			userID = userid;
		};

		var retrieveGroupsByCategory = function retrieveGroupsByCategory(category) {
			var deferred = $q.defer();

			switch (category) {
				case "All Groups":
					GroupService.getAllGroups().then(function (results) {
						deferred.resolve();
					}, function (error) {
						// posts not found
						deferred.reject(error);
					});
					break;
				case "My Groups":
					GroupService.getMyGroups(userID).then(function (results) {
						deferred.resolve();
					}, function (error) {
						// posts not found
						deferred.reject(error);
					});
					break;
				case "Discover Groups":
					GroupService.getDiscoverGroups(userID).then(function (results) {
						deferred.resolve();
					}, function (error) {
						// posts not found
						deferred.reject(error);
					});
					break;
				default:
					console.log("Invalid Group Category");
					break;
			}

			return deferred.promise;
		};

		return {
			getViewGroupsCategories: getViewGroupsCategories,
			getCurrentViewGroupsCategory: getCurrentViewGroupsCategory,
			setCurrentViewGroupsCategory: setCurrentViewGroupsCategory,
			setUserID: setUserID,
			retrieveGroupsByCategory: retrieveGroupsByCategory
		};
	}
})();