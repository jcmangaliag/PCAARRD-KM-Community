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
		$scope.deleteOnePost = _.partial(deleteOnePost, $scope);
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
				$state.go('oneGroup');	// specify what group
		}

		$scope.getPostData = () => {
			if ($stateParams.postType === "view-one-post"){
				PostService.getOnePost($scope, $stateParams.id)
				.then((result) => {
					$scope.selectedPost = result;
				}, (error) => {
					console.log("may error");
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

		$scope.getPostData();
	}

})();