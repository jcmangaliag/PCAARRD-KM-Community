import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('AddPostController', AddPostController);

	AddPostController.$inject = ['$scope', 'AddPostService'];

	function AddPostController ($scope, AddPostService) {

		const {submitPost} = AddPostService;
		$scope.submitPost = _.partial(submitPost);

		$scope.addPostFormData = {};

		$scope.onProcessPostData = (postCategory) => {
			$scope.addPostFormData.category = postCategory;
			$scope.addPostFormData.hashtags = $scope.hashtags;
			$scope.addPostFormData.datePosted = moment().format('MMMM Do YYYY, h:mm:ss a');
			$scope.addPostFormData.reactions = [
				{ 
				  name: "comments", 
				  count: 0,
				  users: [] 
				},
				{ 
				  name: "thumbsUp", 
				  count: 0,
				  users: []  
				},
				{ 
				  name: "happy", 
				  count: 0,
				  users: []  
				},
				{ 
				  name: "sad", 
				  count: 0,
				  users: []  
				}
			];

			// hardcoded as of now, should be Object IDs
			$scope.addPostFormData.postedBy = "Tomas Angelo Poe";
			$scope.addPostFormData.groupBelonged = "Banana";

			$scope.submitPost(_.cloneDeep($scope.addPostFormData));

			$scope.addPostFormData = null;
			$scope.clearHashtags();
		}
	}

})();