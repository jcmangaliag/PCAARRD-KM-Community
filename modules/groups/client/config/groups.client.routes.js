(() => {
	'use strict';
	
	angular
		.module('groups')
		.config(groupRoutes);

	groupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function groupRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('bananaGroup', {
				url: '/groups/banana',
				templateUrl: 'groups/client/views/sampleBananaGroup.html',
				controller: 'SampleBananaGroupController',
				abstract: true
			})
			.state('bananaGroup.about', {
				url: '',
				templateUrl: 'groups/client/views/sampleBananaGroup.about.html',
			})
/*			.state('bananaGroup.members', {
				url: '/members',
				templateUrl: 'users/client/views/sampleBananaGroup.html',
			})*/
			.state('bananaGroup.settings', {
				url: '/settings',
				templateUrl: 'groups/client/views/sampleBananaGroup.settings.html'
			});

		$locationProvider.html5Mode(true);
	}

})();

