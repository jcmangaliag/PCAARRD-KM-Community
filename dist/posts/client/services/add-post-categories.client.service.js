'use strict';

(function () {
	'use strict';

	angular.module('posts').factory('AddPostCategoriesService', AddPostCategoriesService);

	AddPostCategoriesService.$inject = [];

	function AddPostCategoriesService() {

		var addPostCategories = [{
			category: "question",
			title: "Post Question"
		}, {
			category: "report",
			title: "Post Incident Report"
		}, {
			category: "media",
			title: "Post Media or URL"
		}, {
			category: "news",
			title: "Post News"
		}, {
			category: "event",
			title: "Post Event"
		}, {
			category: "advertisement",
			title: "Post Advertisement"
		}, {
			category: "others",
			title: "Post Others"
		}];

		var currentAddPostCategory = {
			postCategory: addPostCategories[0]
		};

		var getAddPostCategories = function getAddPostCategories() {
			return addPostCategories;
		};

		var getCurrentAddPostCategory = function getCurrentAddPostCategory() {
			return currentAddPostCategory;
		};

		var setCurrentAddPostCategory = function setCurrentAddPostCategory(category) {
			var categoryIndex = addPostCategories.map(function (postCategory) {
				return postCategory.category;
			}).indexOf(category);
			currentAddPostCategory.postCategory = addPostCategories[categoryIndex];
		};

		return {
			getAddPostCategories: getAddPostCategories,
			getCurrentAddPostCategory: getCurrentAddPostCategory,
			setCurrentAddPostCategory: setCurrentAddPostCategory
		};
	}
})();