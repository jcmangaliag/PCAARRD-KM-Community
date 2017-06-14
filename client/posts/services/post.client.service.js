import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.factory('PostService', PostService);

	PostService.$inject = ['$http', 'ngToast', '$q', 'CommentService', 'GroupService', 'UserService'];

	function PostService ($http, ngToast, $q, CommentService, GroupService, UserService) {

		let postList = { contents: [] }, postListCopy = { contents: [] }, groupBelonged;

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

		const getAllPosts = () => {
			const deferred = $q.defer();

			$http.get(`/api/posts`)
			.then((response) => {
				postList.contents = response.data.posts;
				postListCopy.contents = _.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getPostsByGroupAndCategory = (category, memberOfGroup) => {	// gets posts of a certain category from a group
			const deferred = $q.defer();
			const config = memberOfGroup? {} : {params: {showPublic : true}};	// if memberOfGroup === true, allows showing private posts

			$http.get(`/api/posts/group-belonged/${groupBelonged}/category/${category}`, config)
			.then((response) => {
				postList.contents = response.data.posts;
				postListCopy.contents = _.toArray(response.data.posts);

				deferred.resolve(response.data.posts);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getAllPostsByGroup = (memberOfGroup) => {	// gets all posts from a group
			const deferred = $q.defer();
			const config = memberOfGroup? {} : {params: {showPublic : true}};	// if memberOfGroup === true, allows showing private posts

			$http.get(`/api/posts/group-belonged/${groupBelonged}`, config)
			.then((response) => {
				postList.contents = response.data.posts;
				postListCopy.contents = _.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getPostsByMyGroupsAndCategory = (category, userID) => {	// gets posts of a certain category from logged in user's groups
			const deferred = $q.defer();

			UserService.getOneUser(userID)
				.then((response) => {
					const groupsJoined = response.groupsJoined.toString() || "none";
					return $http.get(`/api/posts/my-groups/${groupsJoined}/category/${category}`);
				}, (response) => {
					// error in getting one user
				})
				.then((response) => {	// after getting all posts by my groups and category
					postList.contents = response.data.posts;
					postListCopy.contents = _.toArray(response.data.posts);
					deferred.resolve(response.data.posts);
				}, (response) => {
					// error in getting one user or in getting all posts by my groups and category
					deferred.reject(response);
				});

			return deferred.promise;
		}

		const getAllPostsByMyGroups = (userID) => {	// gets all posts from logged in user's groups
			const deferred = $q.defer();
			
			UserService.getOneUser(userID)
				.then((response) => {
					const groupsJoined = response.groupsJoined.toString() || "none";
					return $http.get(`/api/posts/my-groups/${groupsJoined}`);
				}, (response) => {
					// error in getting one user
				})
				.then((response) => {	// after getting all posts by my groups and category
					postList.contents = response.data.posts;
					postListCopy.contents = _.toArray(response.data.posts);
					deferred.resolve(response.data.posts);
				}, (response) => {
					// error in getting one user or in getting all posts by my groups and category
					deferred.reject(response);
				});

			return deferred.promise;
		}

		const getPostsByUserAndCategory = (category, userID) => {	// gets posts of a certain category from a user
			const deferred = $q.defer();
			$http.get(`/api/posts/user/${userID}/category/${category}`)
			.then((response) => {
				postList.contents = response.data.posts;
				postListCopy.contents = _.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getAllPostsByUser = (userID) => {	// gets all posts of a certain category from a user
			const deferred = $q.defer();
			$http.get(`/api/posts/user/${userID}`)
			.then((response) => {
				postList.contents = response.data.posts;
				postListCopy.contents = _.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getAllPostsCountByUser = (userID) => {	// returns the number of posts of a user
			const deferred = $q.defer();
			$http.get(`/api/posts/user/${userID}/length`)
			.then((response) => {
				deferred.resolve(response.data.postsLength);
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

		const setPostReaction = ($scope, post, reactionIndex, currentUser) => {	// set the post's thumbsup, comment, happy, sad
			$scope.selectedPost = post;
			let reactions = $scope.selectedPost.reactions;
			const reactionsLength = reactions.length;
			let duplicateReactionIndex = -1;

			// remove user and count duplicates in reactions excluding the comments
			for (let i = 1; i < reactionsLength; i++){
				if (reactionIndex == 0)	// skip duplicate checking when commenting
					break;
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
				reactions[reactionIndex].count++;

				// avoid duplication of user in comments userlist
				if (reactionIndex > 0 || reactions[0].users.length === 0 || (reactions[0].users.map((user) => user._id).indexOf(currentUser._id) < 0)){
					reactions[reactionIndex].users.push(currentUser);
				}
			}
			
			$http.put(`/api/posts/reactions/${post._id}`, {
				reactions
			}).then(response => {

			});
		}

		const decrementCommentsCount = (post, comment, userCommentsCount, userID) => {	// decrement the count of comments of a post
			post.reactions[0].count--;
			
			if (userCommentsCount < 1){	// removes the user in comments' users list if he/she has no more comment
				const userIndex = post.reactions[0].users.map((user) => user._id).indexOf(userID);
				if (userIndex > -1){
					post.reactions[0].users.splice(userIndex, 1);
				}
			}

			$http.put(`/api/posts/reactions/${post._id}`, {	// update reactions
				reactions: post.reactions
			}).then(response => {

			});
		}

		const deleteOnePost = ($scope, $stateParams, post) => {
			$http.delete(`/api/posts/${post._id}`)
			.then(response => {	
				CommentService.deleteCommentsByReferredPost(post._id);	// deletes all comments of a deleted post

				GroupService.getOneGroup(post.groupBelonged)
				.then((refreshedGroup) => {	// refreshes the group after post deletion
					refreshedGroup.postsCount.total--;
					refreshedGroup.postsCount[post.category]--;
					GroupService.updateGroup(refreshedGroup.handle, {postsCount: refreshedGroup.postsCount});	// updating the post count of group
					if ($scope.selectedGroup){
						$scope.selectedGroup.postsCount = refreshedGroup.postsCount;
						$scope.updatePostsAnalysis();	// reflects changes in Post Analysis UI
					}
				}, (error) => {
					// show 404 not found page
				});

				if ($stateParams.postID){	// if viewing one post, return to group
					$scope.returnToGroup($stateParams.handle);	
				} else {
					$scope.getPostData();	// reloads posts
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
			getAllPosts,
			getPostsByGroupAndCategory,
			getAllPostsByGroup,
			getPostsByMyGroupsAndCategory,
			getAllPostsByMyGroups,
			getPostsByUserAndCategory,
			getAllPostsByUser,
			getAllPostsCountByUser,
			getOnePost,
			setPostReaction,
			deleteOnePost,
			decrementCommentsCount
		};	
	}

})();

