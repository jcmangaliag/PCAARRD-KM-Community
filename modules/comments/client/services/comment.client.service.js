import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('comments')
		.factory('CommentService', CommentService);

	CommentService.$inject = ['$http', 'ngToast'];

	function CommentService ($http, ngToast) {

		let commentList = {
			contents: []
		};

		/* temporary user */
		const username = "Mark Eric Cabanli";
		const userid = "Mark's id";

		const getCommentList = () => {
			return commentList;
		}

		const getComments = () => {
			$http.get('/api/comments')
			.then(response => {
				commentList.contents = response.data.comments;
			});
		}

		const submitComment = (addPostCommentData) => {
			$http.post('/api/comments', addPostCommentData)
			.then(response => {
				getComments();

				ngToast.create({
		    		className: 'success',
		    		content: `Comment was successfully posted. `
		    	});
			});
		}

		const setCommentReaction = (comment, reactionIndex) => {
			let reactions = comment.reactions;
			const reactionsLength = reactions.length;
			let duplicateReactionIndex = -1;

			// remove user and count duplicates in reactions
			for (let i = 0; i < reactionsLength; i++){
				if (reactions[i].users.indexOf(userid) >= 0){ // remove duplicate user and count
					duplicateReactionIndex = i;
					const removeUserIndex = reactions[i].users.indexOf(userid);
					reactions[i].users.splice(removeUserIndex, 1);
					reactions[i].count--;
					break;
				}
			}

			// prevent reposting the same reaction
			if (reactionIndex != duplicateReactionIndex){
				// increments the reaction count and adds the user in reaction userlist
				reactions[reactionIndex].count++;
				reactions[reactionIndex].users.push(userid);
			}

			$http.put(`/api/comments/reactions/${comment._id}`, {
				reactions
			}).then(response => {

			});
		}

		return {
			getCommentList,
			getComments,
			submitComment,
			setCommentReaction,
			userid 
		};	/* temporary userid */
	}

})();

