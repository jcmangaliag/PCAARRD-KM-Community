(() => {
	'use strict';
	
	angular
		.module('home.routes')
		.config(homeRoutes);

	homeRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function homeRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				template: require('../views/logged-in-home.client.view.html'),
				controller: 'LoggedInHomeController'
			})
			.state('about', {
				url: '/about',
				template: require('../views/about.client.view.html')
			});

		$locationProvider.html5Mode(true);
	}

	//angular.bootstrap(document, ['home.routes']);
})();

