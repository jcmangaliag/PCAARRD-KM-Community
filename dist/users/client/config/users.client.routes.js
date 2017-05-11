'use strict';

(function () {
	'use strict';

	angular.module('users').config(userRoutes);

	userRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function userRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/page-not-found');

		$stateProvider.state('register', {
			url: '/register',
			template: '<user-registration></user-registration>',
			controller: 'UserAuthenticationController',
			resolve: {
				$title: function $title() {
					return 'Sign Up';
				},
				authenticate: ['UserAuthenticationService', function (UserAuthenticationService) {
					return UserAuthenticationService.authenticateLoggedOut();
				}]
			}
		}).state('registerAsAdmin', {
			url: '/register-as-admin',
			templateUrl: 'users/client/views/user-admin-registration.client.view.html',
			controller: 'UserAuthenticationController',
			resolve: {
				$title: function $title() {
					return 'Sign Up as Site Administrator';
				},
				authenticate: ['UserAuthenticationService', function (UserAuthenticationService) {
					return UserAuthenticationService.authenticateLoggedOut();
				}]
			}
		}).state('login', {
			url: '/login',
			template: '<user-login></user-login>',
			controller: 'UserAuthenticationController',
			resolve: {
				$title: function $title() {
					return 'Sign In';
				},
				authenticate: ['UserAuthenticationService', function (UserAuthenticationService) {
					return UserAuthenticationService.authenticateLoggedOut();
				}]
			}
		}).state('user-profile', {
			url: '/users/profile/:userID',
			templateUrl: 'users/client/views/user-profile.client.view.html',
			controller: 'UserController',
			params: {
				handle: "--user--"
			},
			resolve: {
				selectedUser: ['UserService', '$stateParams', function (UserService, $stateParams) {
					return UserService.getOneUser($stateParams.userID);
				}],
				$title: ['selectedUser', function (selectedUser) {
					return selectedUser.name.first + ' ' + selectedUser.name.last;
				}]
			}
		}).state('edit-user', {
			url: '/users/profile/:userID/edit',
			templateUrl: 'users/client/views/edit-user.client.view.html',
			controller: 'EditUserController',
			resolve: {
				selectedUser: ['UserService', '$stateParams', function (UserService, $stateParams) {
					return UserService.getOneUser($stateParams.userID);
				}],
				$title: ['selectedUser', function (selectedUser) {
					return selectedUser.name.first + ' ' + selectedUser.name.last + ' - Edit';
				}],
				authenticate: ['UserAuthenticationService', '$stateParams', function (UserAuthenticationService, $stateParams) {
					return UserAuthenticationService.authenticateCurrentUserOrSiteAdmin($stateParams.userID);
				}]
			}
		});

		$locationProvider.html5Mode(true);
	}
})();