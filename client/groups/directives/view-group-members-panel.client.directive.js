(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('viewGroupMembersPanel', viewGroupMembersPanel);


	function viewGroupMembersPanel () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/views/view-group-members-panel.client.view.html'
		}

		return directive;
	}

})();

