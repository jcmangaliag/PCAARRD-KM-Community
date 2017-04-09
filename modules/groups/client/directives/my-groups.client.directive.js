(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('myGroups', myGroups);


	function myGroups () {

		const directive = {
			restrict: 'E',
			scope: true,
			templateUrl: '/groups/client/views/my-groups.client.view.html',
			controller: 'GroupController'
		}

		return directive;
	}

})();

