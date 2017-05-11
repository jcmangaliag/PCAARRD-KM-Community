'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('comments').factory('CommentService', CommentService);

	CommentService.$inject = ['$http', '$q', 'ngToast'];

	function CommentService($http, $q, ngToast) {

		var commentList = {
			contents: []
		};

		var getCommentList = function getCommentList() {
			return commentList;
		};

		var getComments = function getComments(referredPost) {
			$http.get('/api/comments/referredPost/' + referredPost).then(function (response) {
				commentList.contents = response.data.comments;
			});
		};

		var getCommentsLengthByGroupBelonged = function getCommentsLengthByGroupBelonged(groupHandle) {
			var deferred = $q.defer();

			$http.get('/api/comments/groupBelonged/' + groupHandle + '/length').then(function (response) {
				deferred.resolve(response.data.commentsLength);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getCommentsByUser = function getCommentsByUser(referredPost, userID) {
			var deferred = $q.defer();

			$http.get('/api/comments/referredPost/' + referredPost + '/commentedBy/' + userID).then(function (response) {
				deferred.resolve(response.data.comments);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getCommentsLengthByOneUser = function getCommentsLengthByOneUser(userID) {
			var deferred = $q.defer();

			$http.get('/api/comments/commentedBy/' + userID + '/length').then(function (response) {
				deferred.resolve(response.data.commentsLength);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getOneComment = function getOneComment(commentID) {
			var deferred = $q.defer();

			$http.get('/api/comments/' + commentID).then(function (response) {
				deferred.resolve(response.data.comment);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var submitComment = function submitComment(addPostCommentData) {
			$http.post('/api/comments', addPostCommentData).then(function (response) {
				getComments(addPostCommentData.referredPost);

				ngToast.create({
					className: 'success',
					content: 'Comment was successfully posted. '
				});
			});
		};

		var setCommentReaction = function setCommentReaction(comment, reactionIndex, currentUser) {
			var reactions = comment.reactions;
			var reactionsLength = reactions.length;
			var duplicateReactionIndex = -1;

			// remove user and count duplicates in reactions
			for (var i = 0; i < reactionsLength; i++) {
				if (reactions[i].users.length > 0) {
					var removeUserIndex = reactions[i].users.map(function (user) {
						return user._id;
					}).indexOf(currentUser._id);
					if (removeUserIndex >= 0) {
						// remove duplicate user and count
						duplicateReactionIndex = i;
						reactions[i].users.splice(removeUserIndex, 1);
						reactions[i].count--;
						break;
					}
				}
			}

			// prevent reposting the same reaction
			if (reactionIndex != duplicateReactionIndex) {
				// increments the reaction count and adds the user in reaction userlist
				reactions[reactionIndex].count++;
				reactions[reactionIndex].users.push(currentUser);
			}

			$http.put('/api/comments/reactions/' + comment._id, {
				reactions: reactions
			}).then(function (response) {});
		};

		var deleteCommentsByReferredPost = function deleteCommentsByReferredPost(postID) {
			$http.delete('/api/comments/referredPost/' + postID).then(function (response) {});
		};

		var deleteOneComment = function deleteOneComment(comment) {
			var deferred = $q.defer();

			$http.delete('/api/comments/' + comment._id).then(function (response) {
				getComments(comment.referredPost);

				ngToast.create({
					className: 'success',
					content: 'The comment was successfully deleted.'
				});

				deferred.resolve(response);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		return {
			getCommentList: getCommentList,
			getComments: getComments,
			getCommentsLengthByGroupBelonged: getCommentsLengthByGroupBelonged,
			getCommentsByUser: getCommentsByUser,
			getCommentsLengthByOneUser: getCommentsLengthByOneUser,
			getOneComment: getOneComment,
			submitComment: submitComment,
			setCommentReaction: setCommentReaction,
			deleteCommentsByReferredPost: deleteCommentsByReferredPost,
			deleteOneComment: deleteOneComment
		};
	}
})();