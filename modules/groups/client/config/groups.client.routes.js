(() => {
	'use strict';
	
	angular
		.module('groups')
		.config(groupRoutes);

	groupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function groupRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/page-not-found');

		$stateProvider
			.state('groups', {
				url: '/groups/',
				templateUrl: 'groups/client/views/view-groups.client.view.html',
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
					$title: () => 'Group Classifications'
				}
			})
			.state('createGroup', {
				url: '/create-group',	
				templateUrl: 'groups/client/views/create-group.client.view.html',
				controller: 'GroupController',
				resolve: {
					$title: () => 'Create Group'
				}
			})
			.state('oneGroup', {
				url: '/groups/:handle',	
				templateUrl: 'groups/client/views/view-one-group.client.view.html',
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
				templateUrl: 'groups/client/views/edit-one-group.client.view.html',
				controller: 'EditSettingsGroupController',
				resolve: {
					selectedGroup: ['GroupService', '$stateParams', (GroupService, $stateParams) => {
						return GroupService.getOneGroup($stateParams.handle);				
					}],
					$title: ['selectedGroup', (selectedGroup) => `${selectedGroup.name} - Edit`]
				}
			})
			.state('oneGroupSettings', {
				url: '/groups/:handle/settings',
				templateUrl: 'groups/client/views/settings-one-group.client.view.html',
				controller: 'EditSettingsGroupController',
				resolve: {
					selectedGroup: ['GroupService', '$stateParams', (GroupService, $stateParams) => {
						return GroupService.getOneGroup($stateParams.handle);				
					}],
					$title: ['selectedGroup', (selectedGroup) => `${selectedGroup.name} - Settings`]
				}
			})
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'groups/client/views/dashboard.client.view.html',
				controller: 'DashboardController',
				resolve: {
					$title: () => 'Community Dashboard'
				}
			});

		$locationProvider.html5Mode(true);
	}

})();

