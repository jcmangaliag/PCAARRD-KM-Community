(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('viewGroupInfoPanel', viewGroupInfoPanel);


	function viewGroupInfoPanel () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/view-group-info-panel.client.view.html'
		}

		return directive;
	}

})();

