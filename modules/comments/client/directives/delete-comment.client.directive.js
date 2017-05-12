(() => {
	'use strict';
	
	angular
		.module('comments')
		.directive('deleteComment', deleteComment);

	function deleteComment () {

		const directive = {
			restrict: 'E',
			templateUrl: '/comments/client/views/delete-comment.client.view.html'
		}

		return directive;
	}

})();

