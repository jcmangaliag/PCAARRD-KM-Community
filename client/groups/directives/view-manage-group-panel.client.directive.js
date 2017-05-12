(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('viewManageGroupPanel', viewManageGroupPanel);


	function viewManageGroupPanel () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/views/view-manage-group-panel.client.view.html'
		}

		return directive;
	}

})();

