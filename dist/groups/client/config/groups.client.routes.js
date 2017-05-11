'use strict';

(function () {
	'use strict';

	angular.module('groups').config(groupRoutes);

	groupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function groupRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/page-not-found');

		$stateProvider
		/* View Posts from My Groups */
		.state('communityHome', {
			url: '/',
			templateUrl: 'groups/client/views/community-home.client.view.html',
			controller: 'CommunityHomeController',
			params: {
				handle: "--my-groups--"
			},
			resolve: {
				$title: function $title() {
					return 'Community Home';
				}
			}
		}).state('groups', {
			url: '/groups/',
			templateUrl: 'groups/client/views/view-groups.client.view.html',
			controller: 'GroupController',
			resolve: {
				$title: function $title() {
					return 'See Groups';
				}
			}
		}).state('manageGroupClassification', {
			url: '/manage-group-classification',
			template: '<add-group-classification></add-group-classification><group-classifications></group-classifications>',
			controller: 'GroupClassificationController',
			resolve: {
				$title: function $title() {
					return 'Group Classifications';
				},
				authenticate: ['UserAuthenticationService', function (UserAuthenticationService) {
					return UserAuthenticationService.authenticateSiteAdmin();
				}]
			}
		}).state('createGroup', {
			url: '/create-group',
			templateUrl: 'groups/client/views/create-group.client.view.html',
			controller: 'GroupController',
			resolve: {
				$title: function $title() {
					return 'Create Group';
				},
				authenticate: ['UserAuthenticationService', function (UserAuthenticationService) {
					return UserAuthenticationService.authenticateLoggedIn();
				}]
			}
		}).state('oneGroup', {
			url: '/groups/:handle',
			templateUrl: 'groups/client/views/view-one-group.client.view.html',
			controller: 'GroupController',
			resolve: {
				selectedGroup: ['GroupService', '$stateParams', function (GroupService, $stateParams) {
					return GroupService.getOneGroup($stateParams.handle);
				}],
				$title: ['selectedGroup', function (selectedGroup) {
					return '' + selectedGroup.name;
				}]
			}
		}).state('oneGroupEdit', {
			url: '/groups/:handle/edit',
			templateUrl: 'groups/client/views/edit-one-group.client.view.html',
			controller: 'EditSettingsGroupController',
			resolve: {
				selectedGroup: ['GroupService', '$stateParams', function (GroupService, $stateParams) {
					return GroupService.getOneGroup($stateParams.handle);
				}],
				$title: ['selectedGroup', function (selectedGroup) {
					return selectedGroup.name + ' - Edit';
				}],
				authenticate: ['UserAuthenticationService', '$stateParams', function (UserAuthenticationService, $stateParams) {
					return UserAuthenticationService.authenticateGroupAdminOrSiteAdmin($stateParams.handle);
				}]
			}
		}).state('oneGroupSettings', {
			url: '/groups/:handle/settings',
			templateUrl: 'groups/client/views/settings-one-group.client.view.html',
			controller: 'EditSettingsGroupController',
			resolve: {
				selectedGroup: ['GroupService', '$stateParams', function (GroupService, $stateParams) {
					return GroupService.getOneGroup($stateParams.handle);
				}],
				$title: ['selectedGroup', function (selectedGroup) {
					return selectedGroup.name + ' - Settings';
				}],
				authenticate: ['UserAuthenticationService', '$stateParams', function (UserAuthenticationService, $stateParams) {
					return UserAuthenticationService.authenticateGroupAdminOrSiteAdmin($stateParams.handle);
				}]
			}
		}).state('dashboard', {
			url: '/community-dashboard',
			templateUrl: 'groups/client/views/dashboard.client.view.html',
			controller: 'DashboardController',
			resolve: {
				$title: function $title() {
					return 'Community Dashboard';
				},
				authenticate: ['UserAuthenticationService', function (UserAuthenticationService) {
					return UserAuthenticationService.authenticateSiteAdmin();
				}]
			}
		});

		$locationProvider.html5Mode(true);
	}
})();