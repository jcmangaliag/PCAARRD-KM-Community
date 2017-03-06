import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('AddPostController', AddPostController);

	AddPostController.$inject = ['$scope', 'AddPostService', 'AddPostCategoriesService'];

	function AddPostController ($scope, AddPostService, AddPostCategoriesService) {

		const {submitPost} = AddPostService;
		$scope.submitPost = _.partial(submitPost);
		$scope.addPostFormData = {
			category: AddPostCategoriesService.getCurrentAddPostCategory().postCategory.category
		};
		$scope.multipleFields = {
			authors: [''],
			urls: ['']
		};
		$scope.MIN_AUTHOR = 1;
		$scope.MAX_AUTHOR = 5;
		$scope.MIN_URL = 1;
		$scope.MAX_URL = 10;
		$scope.defaultDatetime = moment().format('MMMM D YYYY, h:mm A');
		
		$scope.loadAdditionalFormFields = () => {
			if ($scope.addPostFormData.category === "event"){
				$scope.addPostFormData.startDateTime = $scope.defaultDatetime;
				$scope.endDateTime = { 
					enable: false, 
					selected: $scope.defaultDatetime 
				};
			}
		}

		$scope.toggleEndDateTime = () => {
			$scope.endDateTime.enable = !$scope.endDateTime.enable;
		}

		$scope.addField = (fieldArray, maxField) => {
			if (fieldArray.length < maxField){
				fieldArray.push('');
			}
		}

		$scope.removeField = (fieldArray, minField) => {
			if (fieldArray.length > minField){
				fieldArray.pop();
			}
		}

		$scope.clearMultipleFields = () => {
			_.forOwn($scope.multipleFields, (fieldArray) => { 
				fieldArray.length = 0;
				fieldArray.push('');
			});
		}

		$scope.removeFiles = () => {
			$scope.addPostFormData.files = [];
		}

		$scope.clearForm = () => {
			const category = $scope.addPostFormData.category;
			$scope.addPostFormData = null;
			$scope.clearHashtags();
			$scope.clearMultipleFields();

			if (category === 'event'){
				$scope.addPostFormData = { 
					startDateTime: $scope.defaultDatetime
				};
				//delete $scope.addPostFormData.endDateTime;
				$scope.endDateTime.enable = false;
			}

			if (category === 'report'){
				$scope.addPostFormData = { dateTime: $scope.defaultDatetime };
			}
		}

		$scope.onProcessPostData = (postCategory) => {

			if (postCategory === 'advertisement' && $scope.price){
				$scope.addPostFormData.price = $scope.price.toFixed(2);
			}

			if (postCategory === 'event' && $scope.endDateTime.enable){
				$scope.addPostFormData.endDateTime = $scope.endDateTime.selected;
			}

			if (postCategory === 'news'){
				$scope.addPostFormData.authors = $scope.multipleFields.authors;
			}

			if (postCategory === 'media' && $scope.addPostFormData.mediaType === 'url'){
				$scope.addPostFormData.urls = $scope.multipleFields.urls;
			}

			if (postCategory === 'media' && $scope.addPostFormData.mediaType === 'files' && !$scope.addPostFormData.files){
				alert("No file selected. Please select files.");
				return;
			}

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

			$scope.submitPost($scope.addPostFormData)
			.then(() => {
				$scope.clearForm();
			});
		}

		$scope.loadAdditionalFormFields();
	}

})();