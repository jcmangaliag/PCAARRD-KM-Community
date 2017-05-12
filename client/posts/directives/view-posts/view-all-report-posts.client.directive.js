(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('viewAllReportPosts', viewAllReportPosts);


	function viewAllReportPosts () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/views/view-posts/view-all-report-posts.client.view.html'
		}

		return directive;
	}

})();

