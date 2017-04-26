import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('EditSettingsGroupController', EditSettingsGroupController);

	EditSettingsGroupController.$inject = ['$scope', '$state', '$stateParams', '$q', 'GroupService', 'UserService', 'SharedUploadService', 'EditSettingsGroupService', 'ngToast'];

	function EditSettingsGroupController ($scope, $state, $stateParams, $q, GroupService, UserService, SharedUploadService, EditSettingsGroupService, ngToast) {

		GroupService.getOneGroup($stateParams.handle)
			.then((result) => {
				$scope.selectedGroup = result;
			}, (error) => {
				// show 404 not found page
			});


		// Edit Group

		$scope.uploadPhotoAndSubmitForm = (photo, photoIdentifier) => {
			$scope.progressBarON = true;
			SharedUploadService.uploadPhoto(photo)
				.then((result) => {	
					$scope.progressBarON = false;
					$scope.selectedGroup[photoIdentifier] = result.data.image;
					return EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup);
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

						return EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup);
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
				EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup)
					.then(() => {
						ngToast.create({
				    		className: 'success',
				    		content: `Group was successfully edited. `
				    	});
				    	$scope.enableViewChanges = true;
					});
			}
		}


		// Group Settings

		if ($state.$current.name === "oneGroupSettings"){
			UserService.getAllUsers();
			$scope.users = UserService.getUserList();
		}

		$scope.multipleFields = {
			admins: [''],
		};

		$scope.MIN_ADMIN = 1;

		$scope.newGroupAdmins = { 
			enable: false
		};

		$scope.toggleAddNewGroupAdmins = () => {
			$scope.newGroupAdmins.enable = !$scope.newGroupAdmins.enable;
		}

		$scope.addField = (fieldArray) => {
			fieldArray.push('');
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

		$scope.validateAdminEmailAddress = (adminEmails) => {
			for (let adminEmail of adminEmails){
				if ($scope.users.contents.map((user) => user.email).indexOf(adminEmail) < 0){
					return adminEmail;
				}
			}
			
			return true;
		}

		$scope.convertEmailToUserID = (adminEmails) => {
			const userList = $scope.users.contents;
			return adminEmails.map((adminEmail) => {
					return userList[userList.map((user) => user.email).indexOf(adminEmail)]._id; 
				}
			);
		}

		$scope.onProcessSettingsGroupData = () => {
			if ($scope.newGroupAdmins.enable){
				const validatedEmails = $scope.validateAdminEmailAddress($scope.multipleFields.admins);
				if (validatedEmails !== true){
					ngToast.create({
			    		className: 'danger',
			    		content: `Error: ${validatedEmails} does not exist!`
			    	});

			    	return;
				}

				const convertedAdmins = $scope.convertEmailToUserID($scope.multipleFields.admins);

				_.forEach(convertedAdmins, (convertedAdmin) => {
					if ($scope.selectedGroup.admin.indexOf(convertedAdmin) < 0){
						$scope.selectedGroup.admin.push(convertedAdmin);
					}
				});
			}

			EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup)
				.then(() => {
					
					if ($scope.newGroupAdmins.enable){	// make sure admins are members of the group
				    	_.forEach($scope.selectedGroup.admin, (admin) => {
							UserService.joinGroup(admin, $scope.selectedGroup.handle);
						});
			    	}

					ngToast.create({
			    		className: 'success',
			    		content: `Group Settings was successfully changed. `
			    	});

			    	$scope.enableViewChanges = true;
				});
		}
	}

})();