import moment from 'moment';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('PostController', PostController);

	PostController.$inject = ['$scope', '$stateParams', '$state', 'PostService'];

	function PostController ($scope, $stateParams, $state, PostService) {

		const {submitPost, getOnePost} = PostService;
		$scope.submitPost = _.partial(submitPost);
		$scope.getOnePost = _.partial(getOnePost, $scope);
		
		$scope.getData = () => {
			switch($stateParams.postType){
				case "add-post":
					$scope.hashtags = [''];
					$scope.addPostFormData = {}; // will be filled with add post's fields and values
					break;
				case "view-posts":
					$scope.posts = [];
					PostService.getPosts($scope);
					break;
				case "view-one-post":
					$scope.post = {};
					PostService.getOnePost($scope, $stateParams.id);
					break;
				default:
					console.log("Unrecognized Route!");
			}
		}

		$scope.addPostHashtag = () => {
			if ($scope.hashtags.length < 5){
				$scope.hashtags.push('');
			}
		}

		$scope.removePostHashtag = () => {
			if ($scope.hashtags.length > 1){
				$scope.hashtags.pop();
			}
		}

		$scope.onProcessPostData = (postCategory) => {
			$scope.addPostFormData.category = postCategory;
			$scope.addPostFormData.hashtags = $scope.hashtags;
			$scope.addPostFormData.datePosted = moment().format('MMMM Do YYYY, h:mm:ss a');

			// hardcoded as of now
			$scope.addPostFormData.postedBy = "Mark Doe";
			$scope.addPostFormData.groupBelonged = "Banana";

			$scope.submitPost(_.cloneDeep($scope.addPostFormData));
			$state.go('bananaGroup.addPost');
			alert("Posted successfully!");
		}
		
		$scope.getData();
	}

})();