'use strict';

(function () {
	'use strict';

	angular.module('groups').directive('viewManageGroupPanel', viewManageGroupPanel);

	function viewManageGroupPanel() {

		var directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/view-manage-group-panel.client.view.html'
		};

		return directive;
	}
})();