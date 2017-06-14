import moment from 'moment';
import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('PostController', PostController);

	PostController.$inject = ['$scope', '$state', '$stateParams', 'PostService', 'CommentService', 'GroupService', 'ViewPostsCategoriesService', 'SharedPaginationService', 'UserAuthenticationService', '$filter', 'ngToast'];

	function PostController ($scope, $state, $stateParams, PostService, CommentService, GroupService, ViewPostsCategoriesService, SharedPaginationService, UserAuthenticationService, $filter, ngToast) {

		PostService.setGroupBelonged($stateParams.handle);	// PostService keeps track of the parent group/element of posts (e.g. from a group, from community feed, from user profile)
		$scope.groupBelonged = $stateParams.handle;	// can be a group handle, --my-groups--, --user--

		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.postsPerPage = 5;

		$scope.commentOnOnePost = (groupHandle, postCategory, postID) => {	// redirects to write a comment form
			$state.go(`oneGroup.viewOne${postCategory.charAt(0).toUpperCase() + postCategory.slice(1)}Post`, {handle: groupHandle, postID: postID, '#': 'write-comment'});
		}

		$scope.clearForm = () => {	// not sure if this is still used
			$scope.clearHashtags();
		}

		$scope.setPostsData = () => {	// load the appropriate posts after determining the selected post category
			const currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory().postCategory.category;
			ViewPostsCategoriesService.retrievePostsByCategory(currentViewPostsCategory);
			$scope.posts = PostService.getPostList();
			$scope.postsCopy = PostService.getPostListCopy();
		}

		$scope.getPostData = () => {
			if ($stateParams.postID){	// if viewing one post
				PostService.getOnePost($stateParams.postID)
				.then((result) => {
					$scope.selectedPost = result;	// all info of one post
				}, (error) => {
					// show 404 not found page
				});
			} else {	// if viewing many posts
				if ($stateParams.handle === '--user--'){	// in user profile
					ViewPostsCategoriesService.setUser($stateParams.userID);	// memberOfGroup is null here
					$scope.setPostsData();
				} else {	// in community feed or in specific group

					$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();
					if ($scope.user.isLoggedIn){
						UserAuthenticationService.getCurrentUser()
					    	.then((result)=> {	// load all info of logged in user
					    		// memberOfGroup = if logged in user is member of the current group
					    		const memberOfGroup = ($stateParams.handle === '--my-groups--' || result.groupsJoined.indexOf($stateParams.handle) > -1)? true : false;
					    		ViewPostsCategoriesService.setUser(result._id, memberOfGroup);
					    		$scope.setPostsData();
					    	});
				    } else if ($stateParams.handle !== '--my-groups--'){	// not logged in. in specific group, still show posts
				    	ViewPostsCategoriesService.setUser(null, false);
						$scope.setPostsData();
				    }

				}
			}
		}

		$scope.$watch(() => {	// tracks all the time if the logged in user is a member of the group to determine which posts should be visible
		    return $scope.userMembership;
		}, () => {
			$scope.getPostData();
		});

		$scope.onSetPostReaction = (post, reactionIndex) => {
			if (UserAuthenticationService.isLoggedIn() && $scope.user.currentUser && $scope.user.currentUser.groupsJoined.indexOf(post.groupBelonged) > -1){	// if logged in user is group member
				PostService.getOnePost(post._id)
					.then((result) => {
						const user = {
							_id: $scope.user.currentUser._id, 
							name: `${$scope.user.currentUser.name.first} ${$scope.user.currentUser.name.last}`
						};

						PostService.setPostReaction($scope, result, reactionIndex, user);	// adds reaction to a post
						post.reactions = result.reactions;	// to update the Reactions UI
					}, (error) => {
						// show 404 not found page
					});
			} else {
				ngToast.create({
		    		className: 'warning',
		    		content: `You must join the group first before reacting.`
		    	});
			}
		}

		$scope.returnToGroup = (groupHandle) => {	// Go Back in view one post
			$state.go(`oneGroup`, {handle: groupHandle});
		}

		$scope.$watch('searchPostsValue', function(value){ // filter posts
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

		if ($stateParams.handle === '--my-groups--' || $stateParams.handle === '--user--'){	// load all groups info
			GroupService.getAllGroups();
			$scope.groups = GroupService.getGroupList();
		}

		$scope.getGroupName = (groupHandle) => {	// find the group name given a group handle
			const groupIndex = $scope.groups.contents.map((group) => group.handle).indexOf(groupHandle);
			return groupIndex > -1? $scope.groups.contents[groupIndex].name : '';
		}

		$scope.checkIfGroupAdmin = (groupHandle, currentUser) => {
			const groupIndex = $scope.groups.contents.map((group) => group.handle).indexOf(groupHandle);
			return (groupIndex > -1 && $scope.groups.contents[groupIndex].admin.indexOf(currentUser) > -1)? true: false;
		}

		$scope.showDeletePostButton = (post) => {	// sets delete button visible to post author === logged in user, and to group admin
			let isGroupAdmin = false;
			const isCurrentUser = $scope.user.currentUser && ((post && post.postedBy._id) === $scope.user.currentUser._id);

			if ($state.current.name.indexOf('oneGroup') >= 0){	// if viewing one group
				isGroupAdmin = $scope.user.currentUser && $scope.selectedGroup.admin.indexOf($scope.user.currentUser._id) > -1;
			} else {
				isGroupAdmin = $scope.user.currentUser && $scope.checkIfGroupAdmin(post.groupBelonged, $scope.user.currentUser._id);
			}

			return isGroupAdmin || isCurrentUser;
		}

		$scope.highlightReaction = (selectedReaction) => {	// highlight the reaction that logged in user selected before
			return $scope.user.currentUser && selectedReaction.users.map((user)=> user._id).indexOf($scope.user.currentUser._id) >=0; 
		}

		$scope.onDeleteOnePost = (post) => {	// processing before deleting post
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
			} else {
				PostService.deleteOnePost($scope, $stateParams, post);
			}	
		}
	}

})();