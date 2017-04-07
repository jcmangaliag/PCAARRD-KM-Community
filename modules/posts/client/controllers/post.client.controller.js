import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('PostController', PostController);

	PostController.$inject = ['$scope', '$state', '$stateParams', 'PostService', 'CommentService', 'ViewPostsCategoriesService', 'SharedPaginationService', '$filter'];

	function PostController ($scope, $state, $stateParams, PostService, CommentService, ViewPostsCategoriesService, SharedPaginationService, $filter) {

		const {deleteOnePost} = PostService;
		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.postsPerPage = 5;

		$scope.deleteOnePost = _.partial(deleteOnePost, $scope, $stateParams.postType);
		$scope.userid = PostService.userid;	// temporary userid

		$scope.commentOnOnePost = (postCategory, postID) => {
			$state.go(`oneGroup.viewOne${postCategory.charAt(0).toUpperCase() + postCategory.slice(1)}Post`, {id: postID, '#': 'write-comment'});
		}

		$scope.clearForm = () => {
			$scope.clearHashtags();
		}

		$scope.goBackToViewAllPosts = () => {
			if (window.history.length > 1)
				window.history.back();
			else
				$scope.returnToGroup();	
		}

		$scope.getPostData = () => {
			if ($stateParams.postType === "view-one-post"){
				PostService.getOnePost($stateParams.id)
				.then((result) => {
					$scope.selectedPost = result;
				}, (error) => {
					// show 404 not found page
				});
			} else {
				const currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory().postCategory.category;
				ViewPostsCategoriesService.retrievePostsByCategory(currentViewPostsCategory);
				$scope.posts = PostService.getPostList();
				$scope.postsCopy = PostService.getPostListCopy();
			}
		}

		$scope.onSetPostReaction = (post, reactionIndex) => {
			PostService.getOnePost(post._id)
				.then((result) => {
					PostService.setPostReaction($scope, result, reactionIndex);
					post.reactions = result.reactions;
				}, (error) => {
					// show 404 not found page
				});
		}

		$scope.editPost = (postCategory, postID) => {
			$state.go(`oneGroup.viewOne${postCategory.charAt(0).toUpperCase() + postCategory.slice(1)}Post`, {id: postID});
		}

		$scope.returnToGroup = () => { // specify what group
			$state.go('oneGroup');
		}

		$scope.$watch('searchPostsValue', function(value){ 
			if ($scope.posts){
				const currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory().postCategory.category;
				ViewPostsCategoriesService.retrievePostsByCategory(currentViewPostsCategory)
					.then(() => {
						$scope.posts.contents = $filter('filter')($scope.postsCopy.contents, value);
						$scope.resetCurrentPage();
					}, (error) => {
						// problem with loading posts
					});
			}
    	});

    	$scope.resetSearchBar = () => {
			$scope.searchPostsValue = "";
		}

		$scope.resetCurrentPage = () => {
			$scope.paginate.currentPage = 1;
		}

		$scope.getPostData();
	}

})();