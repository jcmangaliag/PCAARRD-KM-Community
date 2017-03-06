(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('viewAllReportPosts', viewAllReportPosts);


	function viewAllReportPosts () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-all-report-posts.client.view.html'
		}

		return directive;
	}

})();

