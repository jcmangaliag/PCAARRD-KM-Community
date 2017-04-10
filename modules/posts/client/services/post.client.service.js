import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.factory('PostService', PostService);

	PostService.$inject = ['$http', 'ngToast', '$q', 'CommentService'];

	function PostService ($http, ngToast, $q, CommentService) { // to do: check if there's err in http requests

		let postList = { contents: [] }, postListCopy = { contents: [] }, groupBelonged;

		/* temporary user */
		const username = "Mark Eric Cabanli";
		const userid = "Mark's id";

		const getPostList = () => {
			return postList;
		}

		const getPostListCopy = () => {
			return postListCopy;
		}

		const setGroupBelonged = (groupHandle) => {
			groupBelonged = groupHandle;
		}

		const getPostsByCategory = (category) => {
			const deferred = $q.defer();

			$http.get(`/api/posts/groupBelonged/${groupBelonged}/category/${category}`)
			.then((response) => {
				postList.contents = response.data.posts;
				postListCopy.contents = _.toArray(response.data.posts);

				deferred.resolve(response.data.posts);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getAllPosts = () => {
			const deferred = $q.defer();

			$http.get(`/api/posts/groupBelonged/${groupBelonged}`)
			.then((response) => {
				postList.contents = response.data.posts;
				postListCopy.contents = _.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getOnePost = (postID) => {
			const deferred = $q.defer();
			
			$http.get(`/api/posts/${postID}`)
			.then((response) => {
				deferred.resolve(response.data.post);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const setPostReaction = ($scope, post, reactionIndex) => {
			$scope.selectedPost = post;
			let reactions = $scope.selectedPost.reactions;
			const reactionsLength = reactions.length;
			let duplicateReactionIndex = -1;

			// remove user and count duplicates in reactions excluding the comments
			for (let i = 1; i < reactionsLength; i++){
				if (reactionIndex == 0)	// skip duplicate checking when commenting
					break;

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
				reactions[reactionIndex].count++;

				// avoid duplication of user in comments userlist
				if (reactionIndex > 0 || (reactions[0].users.indexOf(userid) < 0)){
					reactions[reactionIndex].users.push(userid);
				}
			}
			
			$http.put(`/api/posts/reactions/${post._id}`, {
				reactions
			}).then(response => {

			});
		}

		const decrementCommentsCount = (post, comment, userCommentsCount, userID) => {
			post.reactions[0].count--;
			
			if (userCommentsCount < 1)
				post.reactions[0].users.splice(post.reactions[0].users.indexOf(userID), 1);

			$http.put(`/api/posts/reactions/${post._id}`, {
				reactions: post.reactions
			}).then(response => {

			});
		}

		const deleteOnePost = ($scope, $stateParams, post) => {
			//const groupBelonged = post.groupBelonged; // specify the group id
			$http.delete(`/api/posts/${post._id}`)
			.then(response => {	
				CommentService.deleteCommentsByReferredPost(post._id);

				if ($stateParams.postID){	// if viewing one post
					$scope.returnToGroup($stateParams.handle);	
				} else {
					$scope.getPostData();	
				}

				ngToast.create({
		    		className: 'success',
		    		content: `The post was successfully deleted.`
		    	});
			});
		}

		return {
			getPostList,
			getPostListCopy,
			setGroupBelonged,
			getPostsByCategory,
			getAllPosts,
			getOnePost,
			setPostReaction,
			deleteOnePost,
			decrementCommentsCount,
			userid 
		};	/* temporary userid */
	}

})();

