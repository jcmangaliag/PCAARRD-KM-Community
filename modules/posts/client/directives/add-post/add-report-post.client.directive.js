(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('addReportPost', addReportPost);


	function addReportPost () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-report-post.client.view.html',
			controller: 'AddPostController'
		}

		return directive;
	}

})();