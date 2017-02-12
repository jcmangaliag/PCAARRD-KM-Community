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

		return {
			getComments,
			submitComment
		};
	}

})();

