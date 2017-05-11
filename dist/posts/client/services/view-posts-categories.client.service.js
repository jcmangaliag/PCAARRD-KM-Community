'use strict';

(function () {
	'use strict';

	angular.module('posts').factory('ViewPostsCategoriesService', ViewPostsCategoriesService);

	ViewPostsCategoriesService.$inject = ['PostService', '$q'];

	function ViewPostsCategoriesService(PostService, $q) {

		var viewPostsCategories = [{
			category: "all",
			title: "All Posts"
		}, {
			category: "question",
			title: "Question Posts"
		}, {
			category: "report",
			title: "Incident Report Posts"
		}, {
			category: "media",
			title: "Media or URL Posts"
		}, {
			category: "news",
			title: "News Posts"
		}, {
			category: "event",
			title: "Event Posts"
		}, {
			category: "advertisement",
			title: "Advertisement Posts"
		}, {
			category: "others",
			title: "Others Posts"
		}];

		var currentViewPostsCategory = {
			postCategory: viewPostsCategories[0]
		};

		var userID = null,
		    memberOfGroup = false;

		var getViewPostsCategories = function getViewPostsCategories() {
			return viewPostsCategories;
		};

		var getCurrentViewPostsCategory = function getCurrentViewPostsCategory() {
			return currentViewPostsCategory;
		};

		var setCurrentViewPostsCategory = function setCurrentViewPostsCategory(category) {
			var categoryIndex = viewPostsCategories.map(function (postCategory) {
				return postCategory.category;
			}).indexOf(category);
			currentViewPostsCategory.postCategory = viewPostsCategories[categoryIndex];
			retrievePostsByCategory(currentViewPostsCategory.postCategory.category);
		};

		var setUser = function setUser(userid, memberOfCurrentGroup) {
			userID = userid;
			memberOfGroup = memberOfCurrentGroup;
		};

		var retrievePostsByCategory = function retrievePostsByCategory(category) {
			var deferred = $q.defer();

			if (category === "all") {
				if (PostService.getGroupBelonged() === '--my-groups--') {
					// no need to check memberOfGroup
					PostService.getAllPostsByMyGroups(userID).then(function (results) {
						deferred.resolve();
					}, function (error) {
						// posts not found
						deferred.reject(error);
					});
				} else if (PostService.getGroupBelonged() === '--user--') {
					PostService.getAllPostsByUser(userID).then(function (results) {
						deferred.resolve();
					}, function (error) {
						// posts not found
						deferred.reject(error);
					});
				} else {
					PostService.getAllPostsByGroup(memberOfGroup).then(function (results) {
						deferred.resolve();
					}, function (error) {
						// posts not found
						deferred.reject(error);
					});
				}
			} else {
				if (PostService.getGroupBelonged() === '--my-groups--') {
					PostService.getPostsByMyGroupsAndCategory(currentViewPostsCategory.postCategory.category, userID).then(function (results) {
						deferred.resolve();
					}, function (error) {
						// posts not found
						deferred.reject(error);
					});
				} else if (PostService.getGroupBelonged() === '--user--') {
					PostService.getPostsByUserAndCategory(currentViewPostsCategory.postCategory.category, userID).then(function (results) {
						deferred.resolve();
					}, function (error) {
						// posts not found
						deferred.reject(error);
					});
				} else {
					PostService.getPostsByGroupAndCategory(currentViewPostsCategory.postCategory.category, memberOfGroup).then(function (results) {
						deferred.resolve();
					}, function (error) {
						// posts not found
						deferred.reject(error);
					});
				}
			}

			return deferred.promise;
		};

		return {
			getViewPostsCategories: getViewPostsCategories,
			getCurrentViewPostsCategory: getCurrentViewPostsCategory,
			setCurrentViewPostsCategory: setCurrentViewPostsCategory,
			setUser: setUser,
			retrievePostsByCategory: retrievePostsByCategory
		};
	}
})();