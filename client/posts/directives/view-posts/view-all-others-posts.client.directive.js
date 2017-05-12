(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('viewAllOthersPosts', viewAllOthersPosts);


	function viewAllOthersPosts () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/views/view-posts/view-all-others-posts.client.view.html'
		}

		return directive;
	}

})();

