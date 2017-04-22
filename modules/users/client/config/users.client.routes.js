(() => {
	'use strict';
	
	angular
		.module('users')
		.config(userRoutes);

	userRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function userRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('register', {
				url: '/register',
				template: '<user-registration></user-registration>',
				controller: 'UserAuthenticationController'
			})
			.state('registerAsAdmin', {
				url: '/register-as-admin',
				templateUrl: 'users/client/views/user-admin-registration.client.view.html',
				controller: 'UserAuthenticationController'
			})
			.state('login', {
				url: '/login',
				templateUrl: 'users/client/views/user-login.client.view.html',
				controller: 'UserAuthenticationController'
			});

		$locationProvider.html5Mode(true);
	}

})();

