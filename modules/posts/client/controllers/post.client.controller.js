import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('PostController', PostController);

	PostController.$inject = ['$scope', '$state', '$stateParams', 'PostService', 'CommentService', 'GroupService', 'ViewPostsCategoriesService', 'SharedPaginationService', 'UserAuthenticationService', '$filter'];

	function PostController ($scope, $state, $stateParams, PostService, CommentService, GroupService, ViewPostsCategoriesService, SharedPaginationService, UserAuthenticationService, $filter) {

		const {deleteOnePost} = PostService;

		PostService.setGroupBelonged($stateParams.handle);
		$scope.groupBelonged = $stateParams.handle;

		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.postsPerPage = 5;

		$scope.deleteOnePost = _.partial(deleteOnePost, $scope, $stateParams);
		$scope.userid = PostService.userid;	// temporary userid

		$scope.commentOnOnePost = (groupHandle, postCategory, postID) => {
			$state.go(`oneGroup.viewOne${postCategory.charAt(0).toUpperCase() + postCategory.slice(1)}Post`, {handle: groupHandle, postID: postID, '#': 'write-comment'});
		}

		$scope.clearForm = () => {
			$scope.clearHashtags();
		}

		$scope.setPostsData = () => {
			const currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory().postCategory.category;
			ViewPostsCategoriesService.retrievePostsByCategory(currentViewPostsCategory);
			$scope.posts = PostService.getPostList();
			$scope.postsCopy = PostService.getPostListCopy();
		}

		$scope.getPostData = () => {
			if ($stateParams.postID){	// if viewing one post
				PostService.getOnePost($stateParams.postID)
				.then((result) => {
					$scope.selectedPost = result;
				}, (error) => {
					// show 404 not found page
				});
			} else {	// if viewing many posts
				if ($stateParams.handle === '--user--'){	// in user profile
					ViewPostsCategoriesService.setUser($stateParams.userID);
					$scope.setPostsData();
				} else {	// in community feed or in specific group

					if ($stateParams.handle === '--my-groups--'){
						$scope.user = {};
						$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();
					}

					if ($scope.user.isLoggedIn){
						UserAuthenticationService.getCurrentUser()
					    	.then((result)=> {
					    		const memberOfGroup = ($stateParams.handle === '--my-groups--' || result.groupsJoined.indexOf($stateParams.handle) > -1)? true : false;
					    		ViewPostsCategoriesService.setUser(result._id, memberOfGroup);
					    		$scope.setPostsData();
					    	});
				    } else if ($stateParams.handle !== '--my-groups--'){	// in specific group, still show posts
				    	ViewPostsCategoriesService.setUser(null, false);
						$scope.setPostsData();
				    }

				}
			}
		}

		$scope.$watch(() => {
		    return $scope.userMembership;
		}, () => {
			$scope.getPostData();
		});

		$scope.onSetPostReaction = (post, reactionIndex) => {
			PostService.getOnePost(post._id)
				.then((result) => {
					PostService.setPostReaction($scope, result, reactionIndex);
					post.reactions = result.reactions;
				}, (error) => {
					// show 404 not found page
				});
		}

		$scope.returnToGroup = (groupHandle) => {
			$state.go(`oneGroup`, {handle: groupHandle});
		}

/*		$scope.setSearchPostsData = (value) => {
			const currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory().postCategory.category;
			ViewPostsCategoriesService.retrievePostsByCategory(currentViewPostsCategory)
				.then(() => {
					$scope.posts.contents = $filter('filter')($scope.postsCopy.contents, value);
					$scope.resetCurrentPage();
				}, (error) => {
					// problem with loading posts
				});
		}*/

		$scope.$watch('searchPostsValue', function(value){ 
			if ($scope.posts){
				/*if ($stateParams.handle === '--user--'){
					ViewPostsCategoriesService.setUser($stateParams.userID);
					$scope.setSearchPostsData(value);
				} else if ($stateParams.handle === '--my-groups--'){
					if ($scope.user.isLoggedIn){
						UserAuthenticationService.getCurrentUser()
					    	.then((result)=> {
					    		ViewPostsCategoriesService.setUser(result._id);
					    		$scope.setSearchPostsData(value);
					    	});
				    }
				} else {
					$scope.setSearchPostsData(value);
				}*/
				$scope.posts.contents = $filter('filter')($scope.postsCopy.contents, value);
				$scope.resetCurrentPage();
			}
    	});

    	$scope.resetSearchBar = () => {
			$scope.searchPostsValue = "";
		}

		$scope.resetCurrentPage = () => {
			$scope.paginate.currentPage = 1;
		}

		$scope.getPostData();

		if ($stateParams.handle === '--my-groups--' || $stateParams.handle === '--user--'){
			GroupService.getAllGroups();
			$scope.groups = GroupService.getGroupList();
		}

		$scope.getGroupName = (groupHandle) => {
			const groupIndex = $scope.groups.contents.map((group) => group.handle).indexOf(groupHandle);
			return groupIndex > -1? $scope.groups.contents[groupIndex].name : '';
		}

	}

})();