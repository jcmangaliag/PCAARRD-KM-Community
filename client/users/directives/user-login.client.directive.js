(() => {
	'use strict';
	
	angular
		.module('users')
		.directive('userLogin', userLogin);

	function userLogin () {

		const directive = {
			restrict: 'E',
			templateUrl: '/users/views/user-login.client.view.html'
		}

		return directive;
	}

})();

