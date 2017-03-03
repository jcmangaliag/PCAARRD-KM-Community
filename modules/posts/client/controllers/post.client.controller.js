import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('PostController', PostController);

	PostController.$inject = ['$scope', '$state', '$stateParams', 'PostService', 'ViewPostsCategoriesService'];

	function PostController ($scope, $state, $stateParams, PostService, ViewPostsCategoriesService) {

		const {getOnePost, setPostReaction} = PostService;
		$scope.setPostReaction = _.partial(setPostReaction, $scope);
		$scope.userid = PostService.userid;	// temporary userid

		$scope.goBackToViewAllPosts = () => {
			console.log($state);
			if (window.history.length > 1)
				window.history.back();
			else
				$state.go('oneGroup');	// specify what group
		}

		$scope.getPostData = () => {
			if ($stateParams.postType === "view-one-post"){
				PostService.getOnePost($scope, $stateParams.id);
			} else {
				const currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory().postCategory.category;
				ViewPostsCategoriesService.retrievePostsByCategory(currentViewPostsCategory);
				$scope.posts = PostService.getPostList();
			}
		}

		$scope.getPostData();
	}

})();