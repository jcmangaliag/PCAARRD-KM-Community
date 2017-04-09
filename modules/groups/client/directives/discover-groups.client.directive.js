(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('discoverGroups', discoverGroups);


	function discoverGroups () {

		const directive = {
			restrict: 'E',
			scope: true,
			templateUrl: '/groups/client/views/discover-groups.client.view.html',
			controller: 'GroupController'
		}

		return directive;
	}

})();

