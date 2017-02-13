(() => {
	'use strict';
	
	angular
		.module('comments')
		.factory('CommentService', CommentService);

	CommentService.$inject = ['$http'];

	function CommentService ($http) {

		const getComments = ($scope) => {
			$http.get('/api/comments')
			.then(response => {
				$scope.comments = response.data.comments;
			});
		}

		const submitComment = (addPostCommentData) => {
			$http.post('/api/comments', addPostCommentData)
			.then(response => {
				location.reload();
			});
		}

		const setCommentReaction = ($scope, reactionIndex) => {
	/*		$scope.post.reactions[reactionIndex].count++;
			$http.put(`/api/posts/comments/${$scope.post._id}`, {
				reactions: $scope.post.reactions
			}).then(response => {
				getOnePost($scope, $scope.post._id);
			});*/
		}

		return {
			getComments,
			submitComment,
			setCommentReaction
		};
	}

})();

