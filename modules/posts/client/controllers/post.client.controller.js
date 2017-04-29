import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('PostController', PostController);

	PostController.$inject = ['$scope', '$state', '$stateParams', 'PostService', 'CommentService', 'GroupService', 'ViewPostsCategoriesService', 'SharedPaginationService', 'UserAuthenticationService', '$filter', 'ngToast'];

	function PostController ($scope, $state, $stateParams, PostService, CommentService, GroupService, ViewPostsCategoriesService, SharedPaginationService, UserAuthenticationService, $filter, ngToast) {

		PostService.setGroupBelonged($stateParams.handle);
		$scope.groupBelonged = $stateParams.handle;

		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.postsPerPage = 5;

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
					    		if ($stateParams.handle === '--my-groups--'){
					    			$scope.user.currentUser = result;
					    		}
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
			if (UserAuthenticationService.isLoggedIn() && $scope.user.currentUser && $scope.user.currentUser.groupsJoined.indexOf(post.groupBelonged) > -1){
				PostService.getOnePost(post._id)
					.then((result) => {
						const user = {
							_id: $scope.user.currentUser._id, 
							name: `${$scope.user.currentUser.name.first} ${$scope.user.currentUser.name.last}`
						};

						PostService.setPostReaction($scope, result, reactionIndex, user);
						post.reactions = result.reactions;
					}, (error) => {
						// show 404 not found page
					});
			} else {
				ngToast.create({
		    		className: 'danger',
		    		content: `You must join the group first before reacting.`
		    	});
			}
		}

		$scope.returnToGroup = (groupHandle) => {
			$state.go(`oneGroup`, {handle: groupHandle});
		}

		$scope.$watch('searchPostsValue', function(value){ 
			if ($scope.posts){
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

		$scope.checkIfGroupAdmin = (groupHandle, currentUser) => {
			const groupIndex = $scope.groups.contents.map((group) => group.handle).indexOf(groupHandle);
			return (groupIndex > -1 && $scope.groups.contents[groupIndex].admin.indexOf(currentUser) > -1)? true: false;
		}

		$scope.showDeletePostButton = (post) => {
			let isGroupAdmin = false;
			const isCurrentUser = $scope.user.currentUser && ((post && post.postedBy._id) === $scope.user.currentUser._id);

			if ($state.current.name.indexOf('oneGroup') >= 0){
				isGroupAdmin = $scope.user.currentUser && $scope.selectedGroup.admin.indexOf($scope.user.currentUser._id) > -1;
			} else {
				isGroupAdmin = $scope.user.currentUser && $scope.checkIfGroupAdmin(post.groupBelonged, $scope.user.currentUser._id);
			}

			return isGroupAdmin || isCurrentUser;
		}

		$scope.highlightReaction = (selectedReaction) => {
			return $scope.user.currentUser && selectedReaction.users.map((user)=> user._id).indexOf($scope.user.currentUser._id) >=0; 
		}

		$scope.onDeleteOnePost = (post) => {
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
			} else {
				PostService.deleteOnePost($scope, $stateParams, post);
			}	
		}
	}

})();