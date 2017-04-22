(() => {
	'use strict';
	
	angular
		.module('users')
		.directive('userRegistration', userRegistration);

	function userRegistration () {

		const directive = {
			restrict: 'E',
			templateUrl: '/users/client/views/user-registration.client.view.html'
		}

		return directive;
	}

})();

