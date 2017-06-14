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
		$scope.multipleFields = {	// used in adding multiple authors and URLs
			authors: [''],
			urls: [{url: '', urlTitle: ''}]
		};
		$scope.MIN_AUTHOR = 1;
		$scope.MAX_AUTHOR = 5;
		$scope.MIN_URL = 1;
		$scope.MAX_URL = 10;
		$scope.defaultDatetime = moment().format('MMMM D YYYY, h:mm A');
		
		$scope.loadAdditionalFormFields = () => {
			if ($scope.addPostFormData.category === "event"){	// sets initial start and end date of event
				$scope.addPostFormData.startDateTime = $scope.defaultDatetime;
				$scope.endDateTime = { 
					enable: false, 
					selected: $scope.defaultDatetime 
				};
			}
			if ($scope.addPostFormData.category === "report"){	// sets initial date of report
				$scope.addPostFormData.dateTime = $scope.defaultDatetime;
			}

			$scope.user = {};
			$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

			if ($scope.user.isLoggedIn){
				UserAuthenticationService.getCurrentUser()
			    	.then((result)=> {
			    		$scope.user.currentUser = result;	// gets all info of logged in user
			    	});
		    }
		}

		$scope.toggleEndDateTime = () => {	// enables or disables adding event end date
			$scope.endDateTime.enable = !$scope.endDateTime.enable;
		}

		$scope.addField = (fieldArray, maxField) => {
			if (fieldArray.length < maxField){
				if (fieldArray === $scope.multipleFields.urls){	
					fieldArray.push({url: '', urlTitle: ''});	// pushing in multipleFields.urls
				} else {
					fieldArray.push('');	// pushing in multipleFields.authors
				}
			}
		}

		$scope.removeField = (fieldArray, minField) => {	// used by author and url multiplefields
			if (fieldArray.length > minField){
				fieldArray.pop();
			}
		}

		$scope.clearMultipleFields = () => {	// clearing both author and url multiplefields
			_.forOwn($scope.multipleFields, (fieldArray) => { 
				fieldArray.length = 0;
				if (fieldArray === $scope.multipleFields.urls){
					fieldArray.push({url: '', urlTitle: ''});
				} else {
					fieldArray.push('');
				}
			});
		}

		$scope.removeFiles = () => {	// clearing files; not sure if this is still used
			$scope.addPostFormData.files = [];
		}

		$scope.clearForm = () => {
			const category = $scope.addPostFormData.category;
			$scope.addPostFormData = null;
			$scope.clearUploadFiles();	// function is found at SharedAddFilesController
			$scope.clearHashtags();	// function is found at SharedAddHashtagsController
			$scope.clearTechnologyHandles();	// function is found at SharedAddTechnologyHandlesController
			$scope.technologyHandle.enable = false;
			$scope.clearMultipleFields();

			if (category === 'event'){
				$scope.addPostFormData = { 
					startDateTime: $scope.defaultDatetime
				};

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

		$scope.onProcessPostData = (postCategory) => {	// processing before adding post

			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			if (postCategory === 'advertisement' && $scope.price){	// makes price with two decimal places
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
			$scope.addPostFormData.hashtags = $scope.hashtags;	// from SharedAddHashtagsController
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

			} else if ($scope.selectedUploadFiles.length > 0){	// with file/s uploaded
				let uploadedFiles = [];
				$scope.progressBarON = true;
				SharedUploadService.uploadFiles($scope.selectedUploadFiles, uploadedFiles)	// upload files
					.then((result) => {
						$scope.progressBarON = false;
						$scope.addPostFormData.files = uploadedFiles;	// get the uploaded files data
						return $scope.submitPost($scope.addPostFormData);	// adds post
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

			$scope.submitPost($scope.addPostFormData)	// add post for no files uploaded
				.then(() => {
					$scope.onSetGroupPosts(postCategory);
					$scope.clearForm();
				});
		}

		$scope.onSetGroupPosts = (postCategory) => {	// update group's post counts after adding a post
			GroupService.getOneGroup($scope.selectedGroup.handle)
				.then((refreshedGroup) => {	// load the group
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