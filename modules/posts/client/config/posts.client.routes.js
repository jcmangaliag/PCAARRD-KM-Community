(() => {
	'use strict';
	
	angular
		.module('posts')
		.config(postsRoutes);

	postsRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function postsRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			// Add Post Categories and Forms
			.state('bananaGroup.addPost', {
				url: '/add-post',
				templateUrl: 'posts/client/views/add-post/add-post-categories.client.view.html',
				controller: 'PostCategoriesController'
			})
			.state('bananaGroup.addPost-question', {
				url: '/add-post/question',
				templateUrl: 'posts/client/views/add-post/add-question-post.client.view.html',
				controller: 'PostController',
				params: {
					postType: "add-post"
				}
			})
			.state('bananaGroup.addPost-ads', {
				url: '/add-post/ads',
				templateUrl: 'posts/client/views/add-post/add-advertisement-post.client.view.html',
				controller: 'PostController',
				params: {
					postType: "add-post"
				}
			})

			// View Posts by Category
			.state('bananaGroup.viewPosts', {
				url: '/view-posts',
				templateUrl: 'posts/client/views/view-post/view-post-categories.client.view.html',
				controller: 'PostCategoriesController'
			})
			.state('bananaGroup.viewPosts-ads', {
				url: '/view-posts/ads',
				templateUrl: 'posts/client/views/view-post/view-advertisement-posts.client.view.html',
				controller: 'PostController',
				params: {
					postType: "view-posts"
				}
			})

			// View One Post
			.state('bananaGroup.viewPosts-one-ads', {
				url: '/view-posts/:category/:id',
				templateUrl: 'posts/client/views/view-post/view-one-advertisement-post.client.view.html',
				controller: 'PostController',
				params: {
					postType: "view-one-post"
				}
			});
			
		$locationProvider.html5Mode(true);
	}

})();