(() => {
	'use strict';
	
	angular
		.module('groups')
		.config(groupRoutes);

	groupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function groupRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/page-not-found');

		$stateProvider
			/* View Posts from My Groups */
			.state('communityHome', {
				url: '/',
				templateUrl: 'groups/views/community-home.client.view.html',
				controller: 'CommunityHomeController',
				params: {
					handle: "--my-groups--"
				},
				resolve: {
					$title: () => 'Community Home'
				}
			})
			.state('groups', {
				url: '/groups/',
				templateUrl: 'groups/views/view-groups.client.view.html',
				controller: 'GroupController',
				resolve: {
					$title: () => 'See Groups'
				}
			})
			.state('manageGroupClassification', {
				url: '/manage-group-classification',	
				template: '<add-group-classification></add-group-classification><group-classifications></group-classifications>',
				controller: 'GroupClassificationController',
				resolve: {
					$title: () => 'Group Classifications',
					authenticate: ['UserAuthenticationService', (UserAuthenticationService) => {
						return UserAuthenticationService.authenticateSiteAdmin();
					}] 
				}
			})
			.state('createGroup', {
				url: '/create-group',	
				templateUrl: 'groups/views/create-group.client.view.html',
				controller: 'GroupController',
				resolve: {
					$title: () => 'Create Group',
					authenticate: ['UserAuthenticationService', (UserAuthenticationService) => {
						return UserAuthenticationService.authenticateLoggedIn();
					}]
				}
			})
			.state('oneGroup', {
				url: '/groups/:handle',	
				templateUrl: 'groups/views/view-one-group.client.view.html',
				controller: 'GroupController',
				resolve: {
					selectedGroup: ['GroupService', '$stateParams', (GroupService, $stateParams) => {
						return GroupService.getOneGroup($stateParams.handle);				
					}],
					$title: ['selectedGroup', (selectedGroup) => `${selectedGroup.name}`]
				}
			})
			.state('oneGroupEdit', {
				url: '/groups/:handle/edit',	
				templateUrl: 'groups/views/edit-one-group.client.view.html',
				controller: 'EditSettingsGroupController',
				resolve: {
					selectedGroup: ['GroupService', '$stateParams', (GroupService, $stateParams) => {
						return GroupService.getOneGroup($stateParams.handle);				
					}],
					$title: ['selectedGroup', (selectedGroup) => `${selectedGroup.name} - Edit`],
					authenticate: ['UserAuthenticationService', '$stateParams', (UserAuthenticationService, $stateParams) => {
						return UserAuthenticationService.authenticateGroupAdminOrSiteAdmin($stateParams.handle);
					}] 
				}
			})
			.state('oneGroupSettings', {
				url: '/groups/:handle/settings',
				templateUrl: 'groups/views/settings-one-group.client.view.html',
				controller: 'EditSettingsGroupController',
				resolve: {
					selectedGroup: ['GroupService', '$stateParams', (GroupService, $stateParams) => {
						return GroupService.getOneGroup($stateParams.handle);				
					}],
					$title: ['selectedGroup', (selectedGroup) => `${selectedGroup.name} - Settings`],
					authenticate: ['UserAuthenticationService', '$stateParams', (UserAuthenticationService, $stateParams) => {
						return UserAuthenticationService.authenticateGroupAdminOrSiteAdmin($stateParams.handle);
					}]
				}
			})
			.state('dashboard', {
				url: '/community-dashboard',
				templateUrl: 'groups/views/dashboard.client.view.html',
				controller: 'DashboardController',
				resolve: {
					$title: () => 'Community Dashboard',
					authenticate: ['UserAuthenticationService', (UserAuthenticationService) => {
						return UserAuthenticationService.authenticateSiteAdmin();
					}]
				}
			});

		$locationProvider.html5Mode(true);
	}

})();

