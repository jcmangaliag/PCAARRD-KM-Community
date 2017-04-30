(() => {
	'use strict';
	
	angular
		.module('posts')
		.config(postRoutes);

	postRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function postRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/page-not-found');

		$stateProvider
			/* View Posts from */
			.state('communityFeed', {
				url: '/',
				templateUrl: 'posts/client/views/view-posts/community-feed.client.view.html',
				params: {
					handle: "--my-groups--"
				},
				resolve: {
					$title: () => 'Community Feed'
				}
			})
			/* View One Post */
			.state('oneGroup.viewOneAdvertisementPost', {
				url: '/view-posts/advertisement/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-advertisement-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.adTitle}`]
				}
			})
			.state('oneGroup.viewOneEventPost', {
				url: '/view-posts/event/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-event-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.eventName}`]
				}
			})
			.state('oneGroup.viewOneMediaPost', {
				url: '/view-posts/media/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-media-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.mediaTitle}`]
				}
			})
			.state('oneGroup.viewOneNewsPost', {
				url: '/view-posts/news/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-news-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.newsTitle}`]
				}
			})
			.state('oneGroup.viewOneOthersPost', {
				url: '/view-posts/others/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-others-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.post}`]
				}
			})
			.state('oneGroup.viewOneQuestionPost', {
				url: '/view-posts/question/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-question-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.question}`]
				}
			})
			.state('oneGroup.viewOneReportPost', {
				url: '/view-posts/report/:postID',
				templateUrl: 'posts/client/views/view-posts/view-one-report-post.client.view.html',
				resolve: {
					selectedPost: ['PostService', '$stateParams', (PostService, $stateParams) => {
						return PostService.getOnePost($stateParams.postID);				
					}],
					$title: ['selectedPost', (selectedPost) => `${selectedPost.reportTitle}`]
				}
			})

		$locationProvider.html5Mode(true);
	}

})();

