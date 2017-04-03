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

		let currentViewPostsCategory = {
			postCategory: viewPostsCategories[0]
		}

		const getViewPostsCategories = () => {
			return viewPostsCategories;
		}

		const getCurrentViewPostsCategory = () => {
			return currentViewPostsCategory;
		}

		const setCurrentViewPostsCategory = (category) => {
			const categoryIndex = viewPostsCategories.map((postCategory) => postCategory.category).indexOf(category);
			currentViewPostsCategory.postCategory = viewPostsCategories[categoryIndex];
			retrievePostsByCategory(currentViewPostsCategory.postCategory.category);
		}

		const retrievePostsByCategory = (category) => {
			const deferred = $q.defer();

			if (category == "all"){
				PostService.getAllPosts()
				.then((results) => {
					deferred.resolve();
				}, (error) => {
					// posts not found
					deferred.reject(error);
				});
			} else {
				PostService.getPostsByCategory(currentViewPostsCategory.postCategory.category)
				.then((results) => {
					deferred.resolve();
				}, (error) => {
					// posts not found
					deferred.reject(error);
				});
			}

			return deferred.promise;
		}

		return {
			getViewPostsCategories,
			getCurrentViewPostsCategory,
			setCurrentViewPostsCategory,
			retrievePostsByCategory
		};
	}

})();

