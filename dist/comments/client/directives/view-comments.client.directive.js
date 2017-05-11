'use strict';

(function () {
	'use strict';

	angular.module('comments').directive('viewComments', viewComments);

	function viewComments() {

		var directive = {
			restrict: 'E',
			templateUrl: '/comments/client/views/view-comments.client.view.html',
			controller: 'CommentController'
		};

		return directive;
	}
})();