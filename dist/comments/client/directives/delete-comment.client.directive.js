'use strict';

(function () {
	'use strict';

	angular.module('comments').directive('deleteComment', deleteComment);

	function deleteComment() {

		var directive = {
			restrict: 'E',
			templateUrl: '/comments/client/views/delete-comment.client.view.html'
		};

		return directive;
	}
})();