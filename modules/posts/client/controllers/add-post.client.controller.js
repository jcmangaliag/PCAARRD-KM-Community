import moment from 'moment';
import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('AddPostController', AddPostController);

	AddPostController.$inject = ['$scope', 'ngToast', '$q', '$stateParams', 'AddPostService', 'AddPostCategoriesService', 'GroupService', 'SharedUploadService', 'UserAuthenticationService', 'UserService'];

	function AddPostController ($scope, ngToast, $q, $stateParams, AddPostService, AddPostCategoriesService, GroupService, SharedUploadService, UserAuthenticationService, UserService) {

		const {submitPost} = AddPostService;
		$scope.submitPost = _.partial(submitPost);
		$scope.addPostFormData = {
			category: AddPostCategoriesService.getCurrentAddPostCategory().postCategory.category,
			showPublic: true
		};
		$scope.multipleFields = {
			authors: [''],
			urls: [{url: '', urlTitle: ''}]
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
			if ($scope.addPostFormData.category === "report"){
				$scope.addPostFormData.dateTime = $scope.defaultDatetime;
			}

			$scope.user = {};
			$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

			if ($scope.user.isLoggedIn){
				UserAuthenticationService.getCurrentUser()
			    	.then((result)=> {
			    		$scope.user.currentUser = result;
			    	});
		    }
		}

		$scope.toggleEndDateTime = () => {
			$scope.endDateTime.enable = !$scope.endDateTime.enable;
		}

		$scope.addField = (fieldArray, maxField) => {
			if (fieldArray.length < maxField){
				if (fieldArray === $scope.multipleFields.urls){
					fieldArray.push({url: '', urlTitle: ''});
				} else {
					fieldArray.push('');
				}
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
				if (fieldArray === $scope.multipleFields.urls){
					fieldArray.push({url: '', urlTitle: ''});
				} else {
					fieldArray.push('');
				}
			});
		}

		$scope.removeFiles = () => {
			$scope.addPostFormData.files = [];
		}

		$scope.clearForm = () => {
			const category = $scope.addPostFormData.category;
			$scope.addPostFormData = null;
			$scope.clearUploadFiles();
			$scope.clearHashtags();
			$scope.clearTechnologyHandles();
			$scope.technologyHandle.enable = false;
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

			if (category === 'advertisement'){
				$scope.price = null;
			}

			$scope.addPostFormData = {category: category, showPublic: true};
		}

		$scope.onProcessPostData = (postCategory) => {

			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			if (postCategory === 'advertisement' && $scope.price){
				$scope.addPostFormData.price = $scope.price.toFixed(2);
			}

			if (postCategory === 'event' && $scope.endDateTime.enable){
				$scope.addPostFormData.endDateTime = $scope.endDateTime.selected;
			}

			if (postCategory === 'news'){
				$scope.addPostFormData.authors = $scope.multipleFields.authors;
			}

			if (postCategory === 'media' && $scope.addPostFormData.mediaType === 'files' && $scope.selectedUploadFiles.length < 1){
				ngToast.create({
		    		className: 'danger',
		    		content: `No file selected. Please select files.`
		    	});
				return;
			} 

			$scope.addPostFormData.category = postCategory;
			if ($scope.technologyHandle.enable){
				$scope.addPostFormData.technologyHandles = $scope.selectedTechnologies;
			}
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

			if ($scope.user.isLoggedIn){
				$scope.addPostFormData.postedBy = {
					_id: $scope.user.currentUser._id,
					name: `${$scope.user.currentUser.name.first} ${$scope.user.currentUser.name.last}`
				}
			}
			$scope.addPostFormData.groupBelonged = $stateParams.handle;

			if (postCategory === 'media' && $scope.addPostFormData.mediaType === 'url'){
				$scope.addPostFormData.urls = $scope.multipleFields.urls;

			} else if ($scope.selectedUploadFiles.length > 0){
				let uploadedFiles = [];
				$scope.progressBarON = true;
				SharedUploadService.uploadFiles($scope.selectedUploadFiles, uploadedFiles)
					.then((result) => {
						$scope.progressBarON = false;
						$scope.addPostFormData.files = uploadedFiles;
						return $scope.submitPost($scope.addPostFormData);
					}, (error) => {
						$scope.progressBarON = false;
						ngToast.create({
				    		className: 'danger',
				    		content: `Error: ${error.data.message}`
				    	});

				    	return $q.reject(error);
					})
					.then(() => {
						$scope.onSetGroupPosts(postCategory);
						$scope.clearForm();
					});

				return;
			}

			$scope.submitPost($scope.addPostFormData)
				.then(() => {
					$scope.onSetGroupPosts(postCategory);
					$scope.clearForm();
				});
		}

		$scope.onSetGroupPosts = (postCategory) => {
			GroupService.getOneGroup($scope.selectedGroup.handle)
				.then((refreshedGroup) => {
					refreshedGroup.postsCount.total++;
					refreshedGroup.postsCount[postCategory]++;
					GroupService.updateGroup(refreshedGroup.handle, {postsCount: refreshedGroup.postsCount});
					$scope.selectedGroup.postsCount = refreshedGroup.postsCount;
					$scope.updatePostsAnalysis();
				}, (error) => {
					// show 404 not found page
				});
		}

		$scope.loadAdditionalFormFields();
	}

})();