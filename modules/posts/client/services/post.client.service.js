(() => {
	'use strict';
	
	angular
		.module('posts')
		.factory('PostService', PostService);

	PostService.$inject = ['$http'];

	function PostService ($http) {

		const getPosts = ($scope) => {
			$http.get('/api/posts')
			.then(response => {
				$scope.posts = response.data.posts;
			});
		}

		const getOnePost = ($scope, postID) => {
			$http.get(`/api/posts/${postID}`)
			.then(response => {
				$scope.post = response.data.post;
			});
		}

		const submitPost = (addPostFormData) => {
			$http.post('/api/posts', addPostFormData)
			.then(response => {
				//
			});
		}

		return {
			getPosts,
			getOnePost,
			submitPost
		};
	}

})();

