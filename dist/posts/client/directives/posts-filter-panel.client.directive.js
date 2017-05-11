'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('postsFilterPanel', postsFilterPanel);

	function postsFilterPanel() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/posts-filter-panel.client.view.html'
		};

		return directive;
	}
})();