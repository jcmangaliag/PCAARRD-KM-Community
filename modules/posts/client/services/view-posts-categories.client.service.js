(() => {
	'use strict';
	
	angular
		.module('posts')
		.factory('ViewPostsCategoriesService', ViewPostsCategoriesService);

	ViewPostsCategoriesService.$inject = ['PostService'];

	function ViewPostsCategoriesService (PostService) {

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
				category: "advertisement",
				title: "Advertisement Posts"
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
				category: "media",
				title: "Media Posts"
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
			if (category == "all"){
				PostService.getAllPosts();
			} else {
				PostService.getPostsByCategory(currentViewPostsCategory.postCategory.category);
			}
		}

		return {
			getViewPostsCategories,
			getCurrentViewPostsCategory,
			setCurrentViewPostsCategory,
			retrievePostsByCategory
		};
	}

})();

