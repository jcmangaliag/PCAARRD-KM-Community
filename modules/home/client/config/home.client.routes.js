(() => {
	'use strict';
	
	angular
		.module('home')
		.config(homeRoutes);

	homeRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function homeRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'home/client/views/logged-in-home.client.view.html',
				controller: 'LoggedInHomeController'
			})
			.state('about', {
				url: '/about',
				templateUrl: 'home/client/views/about.client.view.html'
			});

		$locationProvider.html5Mode(true);
	}

})();

