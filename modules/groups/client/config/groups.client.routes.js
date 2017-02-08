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
				url: '/groups/12724293',
				template: require('../views/sampleBananaGroup.html')
			});

		$locationProvider.html5Mode(true);
	}

})();

