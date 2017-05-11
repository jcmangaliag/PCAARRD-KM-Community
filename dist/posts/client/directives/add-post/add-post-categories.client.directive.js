'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('addPostCategories', addPostCategories);

	function addPostCategories() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-post-categories.client.view.html',
			controller: 'AddPostCategoriesController'
		};

		return directive;
	}
})();