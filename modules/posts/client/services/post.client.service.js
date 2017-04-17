import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.factory('PostService', PostService);

	PostService.$inject = ['$http', 'ngToast', '$q', 'CommentService', 'GroupService'];

	function PostService ($http, ngToast, $q, CommentService, GroupService) { // to do: check if there's err in http requests

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

		const getGroupBelonged = () => {
			return groupBelonged;
		}

		const getPostsByGroupAndCategory = (category) => {
			const deferred = $q.defer();

			$http.get(`/api/posts/group-belonged/${groupBelonged}/category/${category}`)
			.then((response) => {
				postList.contents = response.data.posts;
				postListCopy.contents = _.toArray(response.data.posts);

				deferred.resolve(response.data.posts);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getAllPostsByGroup = () => {
			const deferred = $q.defer();

			$http.get(`/api/posts/group-belonged/${groupBelonged}`)
			.then((response) => {
				postList.contents = response.data.posts;
				postListCopy.contents = _.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getPostsByMyGroupsAndCategory = (category, /* user id?*/) => {
			const deferred = $q.defer();
			const sampleGroups = 'banana,coconut,biodiversity';	// replace with querying all groups where user is a member of, should return group handles
			$http.get(`/api/posts/my-groups/${sampleGroups}/category/${category}`)
			.then((response) => {
				postList.contents = response.data.posts;
				postListCopy.contents = _.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getAllPostsByMyGroups = (/* user id?*/) => {
			const deferred = $q.defer();
			const sampleGroups = 'banana,coconut,biodiversity';	// replace with querying all groups where user is a member of, should return group handles
			$http.get(`/api/posts/my-groups/${sampleGroups}`)
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
			$http.delete(`/api/posts/${post._id}`)
			.then(response => {	
				CommentService.deleteCommentsByReferredPost(post._id);

				GroupService.getOneGroup(post.groupBelonged)
				.then((refreshedGroup) => {
					refreshedGroup.postsCount.total--;
					refreshedGroup.postsCount[post.category]--;
					GroupService.updateGroup(refreshedGroup.handle, {postsCount: refreshedGroup.postsCount});
					if ($scope.selectedGroup){
						$scope.selectedGroup.postsCount = refreshedGroup.postsCount;
						$scope.updatePostsAnalysis();
					}
				}, (error) => {
					// show 404 not found page
				});

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
			getGroupBelonged,
			getPostsByGroupAndCategory,
			getAllPostsByGroup,
			getPostsByMyGroupsAndCategory,
			getAllPostsByMyGroups,
			getOnePost,
			setPostReaction,
			deleteOnePost,
			decrementCommentsCount,
			userid 
		};	/* temporary userid */
	}

})();

