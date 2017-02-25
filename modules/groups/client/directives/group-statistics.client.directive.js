(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('groupStatistics', groupStatistics);


	function groupStatistics () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/view-group-statistics.client.view.html'
		}

		return directive;
	}

})();

