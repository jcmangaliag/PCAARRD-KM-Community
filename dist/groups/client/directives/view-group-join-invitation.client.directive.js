'use strict';

(function () {
	'use strict';

	angular.module('groups').directive('viewGroupJoinInvitation', viewGroupJoinInvitation);

	function viewGroupJoinInvitation() {

		var directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/view-group-join-invitation.client.view.html'
		};

		return directive;
	}
})();