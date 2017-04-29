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
				controller: 'UserAuthenticationController',
				resolve: {
					$title: () => 'Register'
				}
			})
			.state('registerAsAdmin', {
				url: '/register-as-admin',
				templateUrl: 'users/client/views/user-admin-registration.client.view.html',
				controller: 'UserAuthenticationController',
				resolve: {
					$title: () => 'Register as Site Administrator'
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: 'users/client/views/user-login.client.view.html',
				controller: 'UserAuthenticationController',
				resolve: {
					$title: () => 'Log In'
				}
			})
			.state('user-profile', {
				url: '/users/profile/:userID',
				templateUrl: 'users/client/views/user-profile.client.view.html',
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
				templateUrl: 'users/client/views/edit-user.client.view.html',
				controller: 'EditUserController',
				resolve: {
					selectedUser: ['UserService', '$stateParams', (UserService, $stateParams) => {
						return UserService.getOneUser($stateParams.userID);				
					}],
					$title: ['selectedUser', (selectedUser) => `${selectedUser.name.first} ${selectedUser.name.last} - Edit`]
				}
			});

		$locationProvider.html5Mode(true);
	}

})();

