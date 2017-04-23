import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('EditGroupController', EditGroupController);

	EditGroupController.$inject = ['$scope', '$stateParams', '$q', 'GroupService', 'SharedUploadService', 'EditGroupService', 'ngToast'];

	function EditGroupController ($scope, $stateParams, $q, GroupService, SharedUploadService, EditGroupService, ngToast) {

		GroupService.getOneGroup($stateParams.handle)
			.then((result) => {
				$scope.selectedGroup = result;
			}, (error) => {
				// show 404 not found page
			});

		$scope.uploadPhotoAndSubmitForm = (photo, photoIdentifier) => {
			$scope.progressBarON = true;
			SharedUploadService.uploadPhoto(photo)
				.then((result) => {	
					$scope.progressBarON = false;
					$scope.selectedGroup[photoIdentifier] = result.data.image;
					return EditGroupService.submitEditedGroup($scope.selectedGroup);
				}, (error) => {
					$scope.progressBarON = false;
					ngToast.create({
			    		className: 'danger',
			    		content: `Error: ${error.data.message}`
			    	});

			    	return $q.reject(error);
				})
				.then(() => {
					ngToast.create({
			    		className: 'success',
			    		content: `Group was successfully edited. `
			    	});
			    	$scope.enableViewChanges = true;
				});
		}

		$scope.onProcessEditedGroupData = () => {

			let uploadPhoto = false, uploadCoverPhoto = false;

			if ($scope.selectedPhoto && $scope.selectedPhoto.length > 0){
				uploadPhoto = true;
			} 

			if ($scope.selectedCoverPhoto && $scope.selectedCoverPhoto.length > 0){
				uploadCoverPhoto = true;
			}

			if (uploadPhoto && uploadCoverPhoto){
				$scope.progressBarON = true;
				SharedUploadService.uploadPhoto($scope.selectedPhoto[0])
					.then((result) => {	// after uploading group photo
						$scope.selectedGroup.photo = result.data.image;

						return SharedUploadService.uploadPhoto($scope.selectedCoverPhoto[0]);
					}, (error) => {
						$scope.progressBarON = false;
						ngToast.create({
				    		className: 'danger',
				    		content: `Error: ${error.data.message}`
				    	});

				    	return $q.reject(error);
					})
					.then((result) => {	// after uploading group cover photo
						$scope.progressBarON = false;
						$scope.selectedGroup.coverPhoto = result.data.image;

						return EditGroupService.submitEditedGroup($scope.selectedGroup);
					}, (error) => {
						$scope.progressBarON = false;
						ngToast.create({
				    		className: 'danger',
				    		content: `Error: ${error.data.message}`
				    	});

				    	return $q.reject(error);
					})
					.then(() => {	// after submitting edited group
						ngToast.create({
				    		className: 'success',
				    		content: `Group was successfully edited. `
				    	});
				    	$scope.enableViewChanges = true;
					});
			} else if (uploadPhoto){
				$scope.uploadPhotoAndSubmitForm($scope.selectedPhoto[0], "photo");
			} else if (uploadCoverPhoto){
				$scope.uploadPhotoAndSubmitForm($scope.selectedCoverPhoto[0], "coverPhoto");
			} else {
				EditGroupService.submitEditedGroup($scope.selectedGroup)
					.then(() => {
						ngToast.create({
				    		className: 'success',
				    		content: `Group was successfully edited. `
				    	});
				    	$scope.enableViewChanges = true;
					});
			}
		}
	}

})();