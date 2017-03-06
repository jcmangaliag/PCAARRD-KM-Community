(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('viewAllEventPosts', viewAllEventPosts);


	function viewAllEventPosts () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/view-all-event-posts.client.view.html'
		}

		return directive;
	}

})();

