(() => {
	'use strict';
	
	angular
		.module('users')
		.config(userRoutes);

	userRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function userRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/page-not-found');

		$stateProvider
			.state('register', {
				url: '/register',
				template: '<user-registration></user-registration>',
				controller: 'UserAuthenticationController',
				resolve: {
					$title: () => 'Sign Up',
					authenticate: ['UserAuthenticationService', (UserAuthenticationService) => {
						return UserAuthenticationService.authenticateLoggedOut();
					}]
				}
			})
			.state('registerAsAdmin', {
				url: '/register-as-admin',
				templateUrl: 'users/views/user-admin-registration.client.view.html',
				controller: 'UserAuthenticationController',
				resolve: {
					$title: () => 'Sign Up as Site Administrator',
					authenticate: ['UserAuthenticationService', (UserAuthenticationService) => {
						return UserAuthenticationService.authenticateLoggedOut();
					}]
				}
			})
			.state('login', {
				url: '/login',
				template: '<user-login></user-login>',
				controller: 'UserAuthenticationController',
				resolve: {
					$title: () => 'Sign In',
					authenticate: ['UserAuthenticationService', (UserAuthenticationService) => {
						return UserAuthenticationService.authenticateLoggedOut();
					}]
				}
			})
			.state('user-profile', {
				url: '/users/profile/:userID',
				templateUrl: 'users/views/user-profile.client.view.html',
				controller: 'UserController',
				params: {
					handle: "--user--"
				},
				resolve: {
					selectedUser: ['UserService', '$stateParams', (UserService, $stateParams) => {
						return UserService.getOneUser($stateParams.userID);				
					}],
					$title: ['selectedUser', (selectedUser) => `${selectedUser.name.first} ${selectedUser.name.last}`]
				}
			})
			.state('edit-user', {
				url: '/users/profile/:userID/edit',
				templateUrl: 'users/views/edit-user.client.view.html',
				controller: 'EditUserController',
				resolve: {
					selectedUser: ['UserService', '$stateParams', (UserService, $stateParams) => {
						return UserService.getOneUser($stateParams.userID);				
					}],
					$title: ['selectedUser', (selectedUser) => `${selectedUser.name.first} ${selectedUser.name.last} - Edit`],
					authenticate: ['UserAuthenticationService', '$stateParams', (UserAuthenticationService, $stateParams) => {
						return UserAuthenticationService.authenticateCurrentUserOrSiteAdmin($stateParams.userID);
					}]
				}
			});

		$locationProvider.html5Mode(true);
	}

})();

