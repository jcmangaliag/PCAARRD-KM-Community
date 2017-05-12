(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('viewGroupPostsStatisticsPanel', viewGroupPostsStatisticsPanel);


	function viewGroupPostsStatisticsPanel () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/views/view-group-posts-statistics-panel.client.view.html'
		}

		return directive;
	}

})();

