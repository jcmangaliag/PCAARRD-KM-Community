import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('comments')
		.factory('CommentService', CommentService);

	CommentService.$inject = ['$http', '$q', 'ngToast'];

	function CommentService ($http, $q, ngToast) {

		let commentList = {
			contents: []
		};

		const getCommentList = () => {
			return commentList;
		}

		const getComments = (referredPost) => {
			$http.get(`/api/comments/referredPost/${referredPost}`)
			.then(response => {
				commentList.contents = response.data.comments;
			});
		}

		const getCommentsLengthByGroupBelonged = (groupHandle) => {	// get number of comments in a group
			const deferred = $q.defer();

			$http.get(`/api/comments/groupBelonged/${groupHandle}/length`)
			.then((response) => {
				deferred.resolve(response.data.commentsLength);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getCommentsByUser = (referredPost, userID) => {	// get comments of a post and user
			const deferred = $q.defer();

			$http.get(`/api/comments/referredPost/${referredPost}/commentedBy/${userID}`)
			.then((response) => {
				deferred.resolve(response.data.comments);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getCommentsLengthByOneUser = (userID) => {	// get number of comments of user
			const deferred = $q.defer();

			$http.get(`/api/comments/commentedBy/${userID}/length`)
			.then((response) => {
				deferred.resolve(response.data.commentsLength);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getOneComment = (commentID) => {
			const deferred = $q.defer();
			
			$http.get(`/api/comments/${commentID}`)
			.then((response) => {
				deferred.resolve(response.data.comment);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const submitComment = (addPostCommentData) => {
			$http.post('/api/comments', addPostCommentData)
			.then(response => {
				getComments(addPostCommentData.referredPost);

				ngToast.create({
		    		className: 'success',
		    		content: `Comment was successfully posted. `
		    	});
			});
		}

		const setCommentReaction = (comment, reactionIndex, currentUser) => {	// modify comment's reactions
			let reactions = comment.reactions;
			const reactionsLength = reactions.length;
			let duplicateReactionIndex = -1;

			// remove user and count duplicates in reactions
			for (let i = 0; i < reactionsLength; i++){
				if (reactions[i].users.length > 0){
					const removeUserIndex = reactions[i].users.map((user) => user._id).indexOf(currentUser._id);
					if (removeUserIndex >= 0){ // remove duplicate user and count
						duplicateReactionIndex = i;
						reactions[i].users.splice(removeUserIndex, 1);
						reactions[i].count--;
						break;
					}
				}
			}

			// prevent reposting the same reaction
			if (reactionIndex != duplicateReactionIndex){
				// increments the reaction count and adds the user in reaction userlist
				reactions[reactionIndex].count++;
				reactions[reactionIndex].users.push(currentUser);
			}

			$http.put(`/api/comments/reactions/${comment._id}`, {
				reactions
			}).then(response => {

			});
		}

		const deleteCommentsByReferredPost = (postID) => {	// delete all comments of a post
			$http.delete(`/api/comments/referredPost/${postID}`)
			.then(response => {	

			});
		}

		const deleteOneComment = (comment) => {
			const deferred = $q.defer();

			$http.delete(`/api/comments/${comment._id}`)
			.then((response) => {	
				getComments(comment.referredPost);	// updates the post's comments

				ngToast.create({
		    		className: 'success',
		    		content: `The comment was successfully deleted.`
		    	});

		    	deferred.resolve(response);

			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		return {
			getCommentList,
			getComments,
			getCommentsLengthByGroupBelonged,
			getCommentsByUser,
			getCommentsLengthByOneUser,
			getOneComment,
			submitComment,
			setCommentReaction,
			deleteCommentsByReferredPost,
			deleteOneComment
		};	
	}

})();

