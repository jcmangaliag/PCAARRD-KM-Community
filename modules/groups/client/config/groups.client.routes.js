(() => {
	'use strict';
	
	angular
		.module('groups')
		.config(groupRoutes);

	groupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function groupRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/groups/');

		$stateProvider
			/* View All Groups */
			.state('groups', {
				url: '/groups/',
				template: '<my-groups></my-groups><discover-groups></discover-groups>'
			})
			/* Manage Group Classification*/
			.state('manageGroupClassification', {
				url: '/manage-group-classification',	
				template: '<add-group-classification></add-group-classification><group-classifications></group-classifications>',
				controller: 'GroupClassificationController'
			})
			/* Create Group */
			.state('createGroup', {
				url: '/create-group',	
				templateUrl: 'groups/client/views/create-group.client.view.html',
				controller: 'GroupController'
			})
			/* View One Group */
			.state('oneGroup', {
				url: '/groups/:handle',	
				templateUrl: 'groups/client/views/view-one-group.client.view.html',
				controller: 'GroupController'
			})
			/* Settings */
			.state('oneGroup.settings', {
				url: '/settings',
				templateUrl: 'groups/client/views/view-group-settings.client.view.html'
			});

		$locationProvider.html5Mode(true);
	}

})();

