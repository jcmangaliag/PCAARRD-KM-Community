'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('viewAllReportPosts', viewAllReportPosts);

	function viewAllReportPosts() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-all-report-posts.client.view.html'
		};

		return directive;
	}
})();