(() => {
	'use strict';
	
	angular
		.module('posts')
		.factory('AddPostCategoriesService', AddPostCategoriesService);

	AddPostCategoriesService.$inject = [];

	function AddPostCategoriesService () {

		const addPostCategories = [
			{
				category: "question",
				title: "Post Question"
			},
			{
				category: "report",
				title: "Post Incident Report"
			},
			{
				category: "advertisement",
				title: "Post Advertisement"
			},
			{
				category: "news",
				title: "Post News"
			},
			{
				category: "event",
				title: "Post Event"
			},
			{
				category: "media",
				title: "Post Media"
			},
			{
				category: "others",
				title: "Post Others"
			}
		];

		let currentAddPostCategory = {
			postCategory: addPostCategories[0]
		}

		const getAddPostCategories = () => {
			return addPostCategories;
		}

		const getCurrentAddPostCategory = () => {
			return currentAddPostCategory;
		}

		const setCurrentAddPostCategory = (category) => {
			const categoryIndex = addPostCategories.map((postCategory) => postCategory.category).indexOf(category);
			currentAddPostCategory.postCategory = addPostCategories[categoryIndex];
		}

		return {
			getAddPostCategories,
			getCurrentAddPostCategory,
			setCurrentAddPostCategory
		};
	}

})();

