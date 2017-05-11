'use strict';

(function () {
	'use strict';

	angular.module('comments').directive('addComment', addComment);

	function addComment() {

		var directive = {
			restrict: 'E',
			templateUrl: '/comments/client/views/add-comment.client.view.html',
			controller: 'CommentController'
		};

		return directive;
	}
})();