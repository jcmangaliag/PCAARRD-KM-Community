(() => {
	'use strict';
	
	angular
		.module('posts')
		.factory('ViewPostsCategoriesService', ViewPostsCategoriesService);

	ViewPostsCategoriesService.$inject = ['PostService', '$q'];

	function ViewPostsCategoriesService (PostService, $q) {

		const viewPostsCategories = [
			{
				category: "all",
				title: "All Posts"
			},
			{
				category: "question",
				title: "Question Posts"
			},
			{
				category: "report",
				title: "Incident Report Posts"
			},
			{
				category: "media",
				title: "Media or URL Posts"
			},
			{
				category: "news",
				title: "News Posts"
			},
			{
				category: "event",
				title: "Event Posts"
			},
			{
				category: "advertisement",
				title: "Advertisement Posts"
			},
			{
				category: "others",
				title: "Others Posts"
			}
		];

		let currentViewPostsCategory = {	// selected view post category
			postCategory: viewPostsCategories[0]
		}

		let userID = null, memberOfGroup = false;

		const getViewPostsCategories = () => {
			return viewPostsCategories;
		}

		const getCurrentViewPostsCategory = () => {
			return currentViewPostsCategory;
		}

		const setCurrentViewPostsCategory = (category) => {	// sets the selected view post category and loads the appropriate posts
			const categoryIndex = viewPostsCategories.map((postCategory) => postCategory.category).indexOf(category);
			currentViewPostsCategory.postCategory = viewPostsCategories[categoryIndex];
			retrievePostsByCategory(currentViewPostsCategory.postCategory.category);
		}

		const setUser = (userid, memberOfCurrentGroup) => {
			userID = userid;
			memberOfGroup = memberOfCurrentGroup;	// true or false
		}

		const retrievePostsByCategory = (category) => {	// loads the appropriate posts
			const deferred = $q.defer();

			if (category === "all"){
				if (PostService.getGroupBelonged() === '--my-groups--'){	// in community feed. no need to check memberOfGroup
					PostService.getAllPostsByMyGroups(userID)	// loads all posts from logged in user's groups
					.then((results) => {
						deferred.resolve();
					}, (error) => {
						// posts not found
						deferred.reject(error);
					});
				} else if (PostService.getGroupBelonged() === '--user--') {	// in user profile
					PostService.getAllPostsByUser(userID)	// loads all posts (public) of a user
					.then((results) => {
						deferred.resolve();
					}, (error) => {
						// posts not found
						deferred.reject(error);
					});
				} else {
					PostService.getAllPostsByGroup(memberOfGroup)	// loads all posts of a group
					.then((results) => {
						deferred.resolve();
					}, (error) => {
						// posts not found
						deferred.reject(error);
					});
				}
				
			} else {
				if (PostService.getGroupBelonged() === '--my-groups--'){	// in community feed
					PostService.getPostsByMyGroupsAndCategory(currentViewPostsCategory.postCategory.category, userID)
					.then((results) => {	// loads posts of a certain category from logged in user's groups
						deferred.resolve();
					}, (error) => {
						// posts not found
						deferred.reject(error);
					});
				} else if (PostService.getGroupBelonged() === '--user--') {
					PostService.getPostsByUserAndCategory(currentViewPostsCategory.postCategory.category, userID)
					.then((results) => {	// loads posts of a certain category (public) of a user
						deferred.resolve();
					}, (error) => {
						// posts not found
						deferred.reject(error);
					});
				} else {
					PostService.getPostsByGroupAndCategory(currentViewPostsCategory.postCategory.category, memberOfGroup)
					.then((results) => {	// loads posts of a certain category of a group
						deferred.resolve();
					}, (error) => {
						// posts not found
						deferred.reject(error);
					});
				}
			}

			return deferred.promise;
		}

		return {
			getViewPostsCategories,
			getCurrentViewPostsCategory,
			setCurrentViewPostsCategory,
			setUser,
			retrievePostsByCategory
		};
	}

})();

