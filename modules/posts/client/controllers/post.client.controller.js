import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('PostController', PostController);

	PostController.$inject = ['$scope', '$state', '$stateParams', 'PostService', 'CommentService', 'ViewPostsCategoriesService', '$filter'];

	function PostController ($scope, $state, $stateParams, PostService, CommentService, ViewPostsCategoriesService, $filter) {

		const {deleteOnePost} = PostService;
		$scope.deleteOnePost = _.partial(deleteOnePost, $scope, $stateParams.postType);
		$scope.userid = PostService.userid;	// temporary userid
		$scope.pagination = {
			postsPerPage: 5,
			currentPage: 1
		}
		
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

		$scope.$watch('searchValue', function(value){ 
			if ($scope.posts){
				const currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory().postCategory.category;
				ViewPostsCategoriesService.retrievePostsByCategory(currentViewPostsCategory)
					.then(() => {
						$scope.posts.contents = $filter('filter')($scope.postsCopy.contents, value);
						$scope.resetPagination();
					}, (error) => {
						// problem with loading posts
					});
			}
    	});

    	$scope.resetSearchBar = () => {
			$scope.searchValue = "";
		}

    	$scope.pageLimit = () => {
    		return $scope.pagination.postsPerPage *$scope.pagination.currentPage;
    	}

    	$scope.loadMorePosts = () => {
    		$scope.pagination.currentPage++;
    	}

    	$scope.hasMorePosts = () => {
    		return $scope.pagination.currentPage < ($scope.posts.contents.length / $scope.pagination.postsPerPage);
    	}

    	$scope.resetPagination = () => {
    		$scope.pagination.currentPage = 1;
    	}

		$scope.getPostData();
	}

})();