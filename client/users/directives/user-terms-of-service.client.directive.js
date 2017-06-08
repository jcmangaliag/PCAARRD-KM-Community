(() => {
	'use strict';
	
	angular
		.module('users')
		.directive('userTermsOfService', userTermsOfService);

	function userTermsOfService () {

		const directive = {
			restrict: 'E',
			templateUrl: '/users/views/user-terms-of-service.client.view.html'
		}

		return directive;
	}

})();

