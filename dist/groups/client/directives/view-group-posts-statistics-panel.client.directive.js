'use strict';

(function () {
	'use strict';

	angular.module('groups').directive('viewGroupPostsStatisticsPanel', viewGroupPostsStatisticsPanel);

	function viewGroupPostsStatisticsPanel() {

		var directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/view-group-posts-statistics-panel.client.view.html'
		};

		return directive;
	}
})();