(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('groupMembers', groupMembers);


	function groupMembers () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/view-group-members.client.view.html'
		}

		return directive;
	}

})();

