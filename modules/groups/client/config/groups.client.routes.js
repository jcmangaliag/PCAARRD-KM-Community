(() => {
	'use strict';
	
	angular
		.module('groups')
		.config(groupRoutes);

	groupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function groupRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('groups', {
				url: '/groups/',
				templateUrl: 'groups/client/views/view-groups.client.view.html',
				controller: 'GroupController'
			})
			.state('manageGroupClassification', {
				url: '/manage-group-classification',	
				template: '<add-group-classification></add-group-classification><group-classifications></group-classifications>',
				controller: 'GroupClassificationController'
			})
			.state('createGroup', {
				url: '/create-group',	
				templateUrl: 'groups/client/views/create-group.client.view.html',
				controller: 'GroupController'
			})
			.state('oneGroup', {
				url: '/groups/:handle',	
				templateUrl: 'groups/client/views/view-one-group.client.view.html',
				controller: 'GroupController'
			})
			.state('oneGroupEdit', {
				url: '/groups/:handle/edit',	
				templateUrl: 'groups/client/views/edit-one-group.client.view.html',
				controller: 'EditSettingsGroupController'
			})
			.state('oneGroupSettings', {
				url: '/groups/:handle/settings',
				templateUrl: 'groups/client/views/settings-one-group.client.view.html',
				controller: 'EditSettingsGroupController'
			})
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'groups/client/views/dashboard.client.view.html',
				controller: 'DashboardController'
			});

		$locationProvider.html5Mode(true);
	}

})();

