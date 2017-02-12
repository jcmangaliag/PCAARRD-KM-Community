import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('PostController', PostController);

	PostController.$inject = ['$scope', '$stateParams', '$state', 'PostService'];

	function PostController ($scope, $stateParams, $state, PostService) {

		const {submitPost, getOnePost, setReaction} = PostService;
		$scope.submitPost = _.partial(submitPost);
		$scope.setReaction = _.partial(setReaction, $scope);
		
		$scope.getPostData = () => {
			switch($stateParams.postType){
				case "add-post":
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

		$scope.onProcessPostData = (postCategory) => {
			$scope.addPostFormData.category = postCategory;
			$scope.addPostFormData.hashtags = $scope.hashtags;
			$scope.addPostFormData.datePosted = moment().format('MMMM Do YYYY, h:mm:ss a');
			$scope.addPostFormData.reactions = [
				{ 
				  name: "comments", 
				  count: 0 
				},
				{ 
				  name: "thumbsUp", 
				  count: 0 
				},
				{ 
				  name: "happy", 
				  count: 0 
				},
				{ 
				  name: "sad", 
				  count: 0 
				},
				{ 
				  name: "angry", 
				  count: 0 
				}
			];

			// hardcoded as of now, should be Object IDs
			$scope.addPostFormData.postedBy = "Mark Doe";
			$scope.addPostFormData.groupBelonged = "Banana";

			$scope.submitPost(_.cloneDeep($scope.addPostFormData));
			$state.go('bananaGroup.addPost');
			alert("Posted successfully!");
		}
		
		$scope.getPostData();
	}

})();