'use strict';

(function () {
	'use strict';

	angular.module('users').directive('userLogin', userLogin);

	function userLogin() {

		var directive = {
			restrict: 'E',
			templateUrl: '/users/client/views/user-login.client.view.html'
		};

		return directive;
	}
})();