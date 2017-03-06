(() => {
	'use strict';
	
	angular
		.module('groups')
		.config(groupRoutes);

	groupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function groupRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('oneGroup', {
				url: '/groups/banana',	// should be /groups/:groupID
				templateUrl: 'groups/client/views/view-one-group.client.view.html',
				controller: 'OneGroupController'
			})

			/* View One Post */

			
			.state('oneGroup.viewOneAdvertisementPost', {
				url: '/view-posts/advertisement/:id',
				templateUrl: 'posts/client/views/view-posts/view-one-advertisement-post.client.view.html',
				controller: 'PostController',
				params: {
					postType: "view-one-post"
				}
			})
			.state('oneGroup.viewOneEventPost', {
				url: '/view-posts/event/:id',
				templateUrl: 'posts/client/views/view-posts/view-one-event-post.client.view.html',
				controller: 'PostController',
				params: {
					postType: "view-one-post"
				}
			})
			.state('oneGroup.viewOneMediaPost', {
				url: '/view-posts/media/:id',
				templateUrl: 'posts/client/views/view-posts/view-one-media-post.client.view.html',
				controller: 'PostController',
				params: {
					postType: "view-one-post"
				}
			})
			.state('oneGroup.viewOneNewsPost', {
				url: '/view-posts/news/:id',
				templateUrl: 'posts/client/views/view-posts/view-one-news-post.client.view.html',
				controller: 'PostController',
				params: {
					postType: "view-one-post"
				}
			})
			.state('oneGroup.viewOneOthersPost', {
				url: '/view-posts/others/:id',
				templateUrl: 'posts/client/views/view-posts/view-one-others-post.client.view.html',
				controller: 'PostController',
				params: {
					postType: "view-one-post"
				}
			})
			.state('oneGroup.viewOneQuestionPost', {
				url: '/view-posts/question/:id',
				templateUrl: 'posts/client/views/view-posts/view-one-question-post.client.view.html',
				controller: 'PostController',
				params: {
					postType: "view-one-post"
				}
			})
			.state('oneGroup.viewOneReportPost', {
				url: '/view-posts/report/:id',
				templateUrl: 'posts/client/views/view-posts/view-one-report-post.client.view.html',
				controller: 'PostController',
				params: {
					postType: "view-one-post"
				}
			})

			/* Settings */

			.state('oneGroup.settings', {
				url: '/settings',
				templateUrl: 'groups/client/views/view-group-settings.client.view.html'
			});

		$locationProvider.html5Mode(true);
	}

})();

