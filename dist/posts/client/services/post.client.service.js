'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('posts').factory('PostService', PostService);

	PostService.$inject = ['$http', 'ngToast', '$q', 'CommentService', 'GroupService', 'UserService'];

	function PostService($http, ngToast, $q, CommentService, GroupService, UserService) {
		// to do: check if there's err in http requests

		var postList = { contents: [] },
		    postListCopy = { contents: [] },
		    groupBelonged = void 0;

		var getPostList = function getPostList() {
			return postList;
		};

		var getPostListCopy = function getPostListCopy() {
			return postListCopy;
		};

		var setGroupBelonged = function setGroupBelonged(groupHandle) {
			groupBelonged = groupHandle;
		};

		var getGroupBelonged = function getGroupBelonged() {
			return groupBelonged;
		};

		var getAllPosts = function getAllPosts() {
			var deferred = $q.defer();

			$http.get('/api/posts').then(function (response) {
				postList.contents = response.data.posts;
				postListCopy.contents = _lodash2.default.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getPostsByGroupAndCategory = function getPostsByGroupAndCategory(category, memberOfGroup) {
			var deferred = $q.defer();
			var config = memberOfGroup ? {} : { params: { showPublic: true } };

			$http.get('/api/posts/group-belonged/' + groupBelonged + '/category/' + category, config).then(function (response) {
				postList.contents = response.data.posts;
				postListCopy.contents = _lodash2.default.toArray(response.data.posts);

				deferred.resolve(response.data.posts);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getAllPostsByGroup = function getAllPostsByGroup(memberOfGroup) {
			var deferred = $q.defer();
			var config = memberOfGroup ? {} : { params: { showPublic: true } };

			$http.get('/api/posts/group-belonged/' + groupBelonged, config).then(function (response) {
				postList.contents = response.data.posts;
				postListCopy.contents = _lodash2.default.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getPostsByMyGroupsAndCategory = function getPostsByMyGroupsAndCategory(category, userID) {
			var deferred = $q.defer();

			UserService.getOneUser(userID).then(function (response) {
				var groupsJoined = response.groupsJoined.toString() || "none";
				return $http.get('/api/posts/my-groups/' + groupsJoined + '/category/' + category);
			}, function (response) {
				// error in getting one user
			}).then(function (response) {
				// after getting all posts by my groups and category
				postList.contents = response.data.posts;
				postListCopy.contents = _lodash2.default.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, function (response) {
				// error in getting one user or in getting all posts by my groups and category
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getAllPostsByMyGroups = function getAllPostsByMyGroups(userID) {
			var deferred = $q.defer();

			UserService.getOneUser(userID).then(function (response) {
				var groupsJoined = response.groupsJoined.toString() || "none";
				return $http.get('/api/posts/my-groups/' + groupsJoined);
			}, function (response) {
				// error in getting one user
			}).then(function (response) {
				// after getting all posts by my groups and category
				postList.contents = response.data.posts;
				postListCopy.contents = _lodash2.default.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, function (response) {
				// error in getting one user or in getting all posts by my groups and category
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getPostsByUserAndCategory = function getPostsByUserAndCategory(category, userID) {
			var deferred = $q.defer();
			$http.get('/api/posts/user/' + userID + '/category/' + category).then(function (response) {
				postList.contents = response.data.posts;
				postListCopy.contents = _lodash2.default.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getAllPostsByUser = function getAllPostsByUser(userID) {
			var deferred = $q.defer();
			$http.get('/api/posts/user/' + userID).then(function (response) {
				postList.contents = response.data.posts;
				postListCopy.contents = _lodash2.default.toArray(response.data.posts);
				deferred.resolve(response.data.posts);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getAllPostsCountByUser = function getAllPostsCountByUser(userID) {
			var deferred = $q.defer();
			$http.get('/api/posts/user/' + userID + '/length').then(function (response) {
				deferred.resolve(response.data.postsLength);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getOnePost = function getOnePost(postID) {
			var deferred = $q.defer();

			$http.get('/api/posts/' + postID).then(function (response) {
				deferred.resolve(response.data.post);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var setPostReaction = function setPostReaction($scope, post, reactionIndex, currentUser) {
			$scope.selectedPost = post;
			var reactions = $scope.selectedPost.reactions;
			var reactionsLength = reactions.length;
			var duplicateReactionIndex = -1;

			// remove user and count duplicates in reactions excluding the comments
			for (var i = 1; i < reactionsLength; i++) {
				if (reactionIndex == 0) // skip duplicate checking when commenting
					break;
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
				reactions[reactionIndex].count++;

				// avoid duplication of user in comments userlist
				if (reactionIndex > 0 || reactions[0].users.length === 0 || reactions[0].users.map(function (user) {
					return user._id;
				}).indexOf(currentUser._id) < 0) {
					reactions[reactionIndex].users.push(currentUser);
				}
			}

			$http.put('/api/posts/reactions/' + post._id, {
				reactions: reactions
			}).then(function (response) {});
		};

		var decrementCommentsCount = function decrementCommentsCount(post, comment, userCommentsCount, userID) {
			post.reactions[0].count--;

			if (userCommentsCount < 1) {
				var userIndex = post.reactions[0].users.map(function (user) {
					return user._id;
				}).indexOf(userID);
				if (userIndex > -1) {
					post.reactions[0].users.splice(userIndex, 1);
				}
			}

			$http.put('/api/posts/reactions/' + post._id, {
				reactions: post.reactions
			}).then(function (response) {});
		};

		var deleteOnePost = function deleteOnePost($scope, $stateParams, post) {
			$http.delete('/api/posts/' + post._id).then(function (response) {
				CommentService.deleteCommentsByReferredPost(post._id);

				GroupService.getOneGroup(post.groupBelonged).then(function (refreshedGroup) {
					refreshedGroup.postsCount.total--;
					refreshedGroup.postsCount[post.category]--;
					GroupService.updateGroup(refreshedGroup.handle, { postsCount: refreshedGroup.postsCount });
					if ($scope.selectedGroup) {
						$scope.selectedGroup.postsCount = refreshedGroup.postsCount;
						$scope.updatePostsAnalysis();
					}
				}, function (error) {
					// show 404 not found page
				});

				if ($stateParams.postID) {
					// if viewing one post
					$scope.returnToGroup($stateParams.handle);
				} else {
					$scope.getPostData();
				}

				ngToast.create({
					className: 'success',
					content: 'The post was successfully deleted.'
				});
			});
		};

		return {
			getPostList: getPostList,
			getPostListCopy: getPostListCopy,
			setGroupBelonged: setGroupBelonged,
			getGroupBelonged: getGroupBelonged,
			getAllPosts: getAllPosts,
			getPostsByGroupAndCategory: getPostsByGroupAndCategory,
			getAllPostsByGroup: getAllPostsByGroup,
			getPostsByMyGroupsAndCategory: getPostsByMyGroupsAndCategory,
			getAllPostsByMyGroups: getAllPostsByMyGroups,
			getPostsByUserAndCategory: getPostsByUserAndCategory,
			getAllPostsByUser: getAllPostsByUser,
			getAllPostsCountByUser: getAllPostsCountByUser,
			getOnePost: getOnePost,
			setPostReaction: setPostReaction,
			deleteOnePost: deleteOnePost,
			decrementCommentsCount: decrementCommentsCount
		};
	}
})();