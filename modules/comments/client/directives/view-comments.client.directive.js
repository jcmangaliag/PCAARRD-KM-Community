(() => {
	'use strict';
	
	angular
		.module('comments')
		.directive('viewComments', viewComments);

	function viewComments () {

		const directive = {
			restrict: 'E',
			templateUrl: '/comments/client/views/view-comments.client.view.html',
			controller: 'CommentController'
		}

		return directive;
	}

})();

