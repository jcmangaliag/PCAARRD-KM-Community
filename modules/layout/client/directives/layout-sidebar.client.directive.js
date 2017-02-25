(() => {
	'use strict';
	
	angular
		.module('layout')
		.directive('layoutSidebar', layoutSidebar);

	function layoutSidebar () {

		const directive = {
			restrict: 'E',
			templateUrl: '/layout/client/views/layout-sidebar.client.view.html',
			controller: 'SidebarController'
		}

		return directive;
	}

})();

