import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('EditSettingsGroupController', EditSettingsGroupController);

	EditSettingsGroupController.$inject = ['$scope', '$state', '$stateParams', '$q', 'GroupService', 'UserAuthenticationService', 'UserService', 'SharedUploadService', 'EditSettingsGroupService', 'GroupClassificationService', 'ngToast'];

	function EditSettingsGroupController ($scope, $state, $stateParams, $q, GroupService, UserAuthenticationService, UserService, SharedUploadService, EditSettingsGroupService, GroupClassificationService, ngToast) {

		GroupService.getOneGroup($stateParams.handle)	// get all info of selected group
			.then((result) => {
				$scope.selectedGroup = result;
			}, (error) => {
				// show 404 not found page
			});


		// Edit Group

		$scope.uploadPhotoAndSubmitForm = (photo, photoIdentifier) => {	// used when uploading group photo or cover photo
			$scope.progressBarON = true;
			SharedUploadService.uploadPhoto(photo)
				.then((result) => {	
					$scope.progressBarON = false;
					$scope.selectedGroup[photoIdentifier] = result.data.image;	// storing the uploaded photo info to group data
					return EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup);
				}, (error) => {
					$scope.progressBarON = false;
					ngToast.create({
			    		className: 'danger',
			    		content: `Error: ${error.data.message}`
			    	});

			    	return $q.reject(error);
				})
				.then(() => {	// after editing the group successfully
					if ($scope.selectedGroup.classification.type === "R&D and Tech Transfer-based"){
						$scope.updateRDGroupClassification();	// also update r&d group classification for changes
					}

					ngToast.create({
			    		className: 'success',
			    		content: `Group was successfully edited. `
			    	});
			    	$scope.enableViewChanges = true;
				});
		}

		$scope.updateRDGroupClassification = () => {	// update isps
			GroupClassificationService.updateGroupClassification($scope.selectedGroup.classification._id, 
				{isps: $scope.selectedGroup.classification.isps});
		}

		$scope.onProcessEditedGroupData = () => {	// processing before submitting edited group data

			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			let uploadPhoto = false, uploadCoverPhoto = false;

			if ($scope.selectedGroup.classification.type === "R&D and Tech Transfer-based"){	// makes isps array type
				$scope.selectedGroup.classification.isps = $scope.selectedGroup.classification.isps.toString();
				$scope.selectedGroup.classification.isps = $scope.selectedGroup.classification.isps? $scope.selectedGroup.classification.isps.split(',') : [];
			}

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
						$scope.selectedGroup.photo = result.data.image;	// storing the uploaded photo info to group data

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
						$scope.selectedGroup.coverPhoto = result.data.image;	// storing the uploaded photo info to group data

						return EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup);
					}, (error) => {
						$scope.progressBarON = false;
						ngToast.create({
				    		className: 'danger',
				    		content: `Error: ${error.data.message}`
				    	});

				    	return $q.reject(error);
					})
					.then(() => {	// after editing the group successfully
						if ($scope.selectedGroup.classification.type === "R&D and Tech Transfer-based"){
							$scope.updateRDGroupClassification();	// also update r&d group classification for changes
						}

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
						if ($scope.selectedGroup.classification.type === "R&D and Tech Transfer-based"){
							$scope.updateRDGroupClassification();	// also update r&d group classification for changes
						}

						ngToast.create({
				    		className: 'success',
				    		content: `Group was successfully edited. `
				    	});
				    	$scope.enableViewChanges = true;
					});
			}
		}


		// Group Settings

		if ($state.$current.name === "oneGroupSettings"){	// get info of all users
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

		$scope.toggleAddNewGroupAdmins = () => {	// enables or disables adding group admin
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

		$scope.validateAdminEmailAddress = (adminEmails) => {	// returns true if all emails exist in the app
			for (let adminEmail of adminEmails){
				if ($scope.users.contents.map((user) => user.email).indexOf(adminEmail) < 0){
					return adminEmail;
				}
			}
			
			return true;
		}

		$scope.convertEmailToUserID = (adminEmails) => {	// set of emails to set of user id
			const userList = $scope.users.contents;
			return adminEmails.map((adminEmail) => {
					return userList[userList.map((user) => user.email).indexOf(adminEmail)]._id; 
				}
			);
		}

		$scope.validateNewAdminsMembership = (adminIDs, group) => {	// returns true if all new admins are members of group
			for (let i = 0; i < adminIDs.length; i++){
				const memberIndex = $scope.users.contents.map((user) => user._id).indexOf(adminIDs[i]);
				if (memberIndex > -1 && $scope.users.contents[memberIndex].groupsJoined.indexOf(group.handle) < 0){
					return i;	// don't validate if the admin is not a member
				}
			}

			return true;
		}

		$scope.onProcessSettingsGroupData = () => {	

			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}
			
			if ($scope.newGroupAdmins.enable){	// only when new group admins added
				const validatedEmails = $scope.validateAdminEmailAddress($scope.multipleFields.admins);
				if (validatedEmails !== true){
					ngToast.create({
			    		className: 'warning',
			    		content: `User ${validatedEmails} does not exist!`
			    	});

			    	return;
				}

				const convertedAdmins = $scope.convertEmailToUserID($scope.multipleFields.admins);
				const validatedMembers = $scope.validateNewAdminsMembership(convertedAdmins, $scope.selectedGroup);
				if (validatedMembers !== true){

					ngToast.create({
			    		className: 'warning',
			    		content: `User ${$scope.multipleFields.admins[validatedMembers]} is not a member of this group!`
			    	});

			    	return;
				}

				_.forEach(convertedAdmins, (convertedAdmin) => {	// adds only the admins that are not yet in group admin list
					if ($scope.selectedGroup.admin.indexOf(convertedAdmin) < 0){
						$scope.selectedGroup.admin.push(convertedAdmin);
					}
				});
			}

			EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup)
				.then(() => {

					ngToast.create({
			    		className: 'success',
			    		content: `Group Settings was successfully changed. `
			    	});

			    	$scope.enableViewChanges = true;
				});
		}
	}

})();