'use strict';

(function () {
	'use strict';

	angular.module('groups').directive('viewGroupMembersPanel', viewGroupMembersPanel);

	function viewGroupMembersPanel() {

		var directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/view-group-members-panel.client.view.html'
		};

		return directive;
	}
})();