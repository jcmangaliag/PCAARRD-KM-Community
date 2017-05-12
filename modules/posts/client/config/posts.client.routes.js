(() => {
	'use strict';
	
	angular
		.module('posts')
		.config(postRoutes);

	postRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function postRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/page-not-found');

		$stateProvider
			/* View One Post */
			.state('oneGroup.viewOneAdvertisementPost', {
				url: '/view-posts/advertisement/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-advertisement-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.adTitle}`],
					authenticate: ['UserAuthenticationService', '$stateParams', (UserAuthenticationService, $stateParams) => {
						return UserAuthenticationService.authenticatePostVisiblity($stateParams.handle, $stateParams.postID);
					}]
				}
			})
			.state('oneGroup.viewOneEventPost', {
				url: '/view-posts/event/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-event-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.eventName}`],
					authenticate: ['UserAuthenticationService', '$stateParams', (UserAuthenticationService, $stateParams) => {
						return UserAuthenticationService.authenticatePostVisiblity($stateParams.handle, $stateParams.postID);
					}]
				}
			})
			.state('oneGroup.viewOneMediaPost', {
				url: '/view-posts/media/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-media-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.mediaTitle}`],
					authenticate: ['UserAuthenticationService', '$stateParams', (UserAuthenticationService, $stateParams) => {
						return UserAuthenticationService.authenticatePostVisiblity($stateParams.handle, $stateParams.postID);
					}]
				}
			})
			.state('oneGroup.viewOneNewsPost', {
				url: '/view-posts/news/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-news-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.newsTitle}`],
					authenticate: ['UserAuthenticationService', '$stateParams', (UserAuthenticationService, $stateParams) => {
						return UserAuthenticationService.authenticatePostVisiblity($stateParams.handle, $stateParams.postID);
					}]
				}
			})
			.state('oneGroup.viewOneOthersPost', {
				url: '/view-posts/others/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-others-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.post}`],
					authenticate: ['UserAuthenticationService', '$stateParams', (UserAuthenticationService, $stateParams) => {
						return UserAuthenticationService.authenticatePostVisiblity($stateParams.handle, $stateParams.postID);
					}]
				}
			})
			.state('oneGroup.viewOneQuestionPost', {
				url: '/view-posts/question/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-question-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.question}`],
					authenticate: ['UserAuthenticationService', '$stateParams', (UserAuthenticationService, $stateParams) => {
						return UserAuthenticationService.authenticatePostVisiblity($stateParams.handle, $stateParams.postID);
					}] 
				}
			})
			.state('oneGroup.viewOneReportPost', {
				url: '/view-posts/report/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-report-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.reportTitle}`],
					authenticate: ['UserAuthenticationService', '$stateParams', (UserAuthenticationService, $stateParams) => {
						return UserAuthenticationService.authenticatePostVisiblity($stateParams.handle, $stateParams.postID);
					}]
				}
			})

		$locationProvider.html5Mode(true);
	}

})();

