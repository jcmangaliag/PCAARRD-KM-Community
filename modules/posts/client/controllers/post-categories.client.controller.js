(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('PostCategoriesController', PostCategoriesController);

	PostCategoriesController.$inject = ['$scope'];

	function PostCategoriesController ($scope) {
		$scope.postButtons = [
			{
				category: "question",
				name: "Question",
				logo: "question-sign"
			},
			{
				category: "report",
				name: "Report",
				logo: "exclamation-sign"
			},
			{
				category: "event",
				name: "Event",
				logo: "calendar"
			},
			{
				category: "news",
				name: "News",
				logo: "globe"
			},
			{
				category: "ads",
				name: "Advertisement",
				logo: "file"
			},
			{
				category: "mediaResource",
				name: "Media Resource",
				logo: "open-file"
			},
			{
				category: "other",
				name: "Other",
				logo: "pencil"
			}
		];
	}

})();