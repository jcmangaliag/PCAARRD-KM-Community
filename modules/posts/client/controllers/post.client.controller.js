import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('PostController', PostController);

	PostController.$inject = ['$scope', '$state', '$stateParams', 'PostService', 'ViewPostsCategoriesService'];

	function PostController ($scope, $state, $stateParams, PostService, ViewPostsCategoriesService) {

		const {setPostReaction, deleteOnePost} = PostService;
		$scope.setPostReaction = _.partial(setPostReaction, $scope);
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
				PostService.getOnePost($scope, $stateParams.id)
				.then((result) => {
					$scope.selectedPost = result;
				}, (error) => {
					// show 404 not found page
				});
			} else {
				const currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory().postCategory.category;
				ViewPostsCategoriesService.retrievePostsByCategory(currentViewPostsCategory);
				$scope.posts = PostService.getPostList();
			}
		}

		$scope.editPost = (postCategory, postID) => {
			$state.go(`oneGroup.viewOne${postCategory.charAt(0).toUpperCase() + postCategory.slice(1)}Post`, {id: postID});
			
		}

		$scope.returnToGroup = () => { // specify what group
			$state.go('oneGroup');
		}

		$scope.getPostData();
	}

})();