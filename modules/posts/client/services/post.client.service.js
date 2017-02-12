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

		const setReaction = ($scope, reactionIndex) => {
			$scope.post.reactions[reactionIndex].count++;
			$http.put(`/api/posts/reactions/${$scope.post._id}`, {
				reactions: $scope.post.reactions
			}).then(response => {
				getOnePost($scope, $scope.post._id);
			});
		}

		return {
			getPosts,
			getOnePost,
			submitPost,
			setReaction
		};
	}

})();

