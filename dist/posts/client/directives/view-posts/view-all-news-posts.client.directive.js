'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('viewAllNewsPosts', viewAllNewsPosts);

	function viewAllNewsPosts() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-all-news-posts.client.view.html'
		};

		return directive;
	}
})();