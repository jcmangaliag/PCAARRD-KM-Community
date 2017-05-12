(() => {
	'use strict';
	
	angular
		.module('shared')
		.config(sharedRoutes);

	sharedRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function sharedRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/page-not-found');

		$stateProvider
			/* 404 Not Found */
			.state('pageNotFound', {
				url: '/page-not-found',
				templateUrl: 'shared/views/shared-page-not-found.client.view.html',
				resolve: {
					$title: () => '404 - Page Not Found'
				}
			})

		$locationProvider.html5Mode(true);
	}

})();

