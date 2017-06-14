import _ from 'lodash/lodash.min';
import moment from 'moment';

(() => {
	'use strict';
	
	angular
		.module('users')
		.controller('EditSettingsUserController', EditSettingsUserController);

	EditSettingsUserController.$inject = ['$scope', '$window', '$stateParams', '$q', 'UserAuthenticationService', 'UserService', 'SharedUploadService', 'EditSettingsUserService', 'ngToast'];

	function EditSettingsUserController ($scope, $window, $stateParams, $q, UserAuthenticationService, UserService, SharedUploadService, EditSettingsUserService, ngToast) {

		$scope.occupationList = [
			"Student", 
			"Farmer",
			"Researcher / Scientist",
			"Academician",
			"Policymaker",
			"Entrepreneur",
			"Extension worker",
			"Media",
			"Others"
		];		

		UserService.getOneUser($stateParams.userID)
			.then((result) => {	// load user data
				$scope.selectedUser = result;
				$scope.selectedMonth = moment($scope.selectedUser.birthdate, 'MMMM Do YYYY').format('MMMM');
				$scope.selectedDay = moment($scope.selectedUser.birthdate, 'MMMM Do YYYY').format('D');
				$scope.selectedYear = moment($scope.selectedUser.birthdate, 'MMMM Do YYYY').format('YYYY');
				$scope.firstName = angular.copy($scope.selectedUser.name.first);	// sets the label "Edit <first name>'s' Information"
			}, (error) => {
				// show 404 not found page
			});

		$scope.getAllMonths = () => {
			return moment.months();	// array of January, February, ...
		}

		$scope.getAllDays = () => {
			let days = [];
			for (let i = 1; i <= 31; i++){
				days.push(i);
			}
			return days;	// 31 days
		}

		$scope.getAllYears = () => {
			let years = [];
			for (let i = moment().get('year'); i >= 1900; i--){
				years.push(i);
			}
			return years;	// year 1900 - current year
		}

		$scope.onProcessEditedUserData = () => {	// processing before submitting edited user info
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			$scope.selectedUser.birthdate = `${$scope.selectedMonth} ${$scope.selectedDay} ${$scope.selectedYear}`;

			if ($scope.selectedPhoto && $scope.selectedPhoto.length > 0){	// if there's a photo to upload
				$scope.progressBarON = true;
				SharedUploadService.uploadPhoto($scope.selectedPhoto[0])
					.then((result) => {	// after uploading user photo
						$scope.progressBarON = false;
						$scope.selectedUser.photo = result.data.image;	// getting the uploaded photo info
						return EditSettingsUserService.submitModifiedUser($scope.selectedUser);
					}, (error) => {	// error uploading the photo
						$scope.progressBarON = false;
						ngToast.create({
				    		className: 'danger',
				    		content: `Error: ${error.data.message}`
				    	});

				    	return $q.reject(error);
					})
					.then(() => {	// after submitting edited user
						ngToast.create({
				    		className: 'success',
				    		content: `User was successfully edited. `
				    	});
				    	$window.location.reload();
					});
			} else {	// no photo to upload
				EditSettingsUserService.submitModifiedUser($scope.selectedUser)
					.then(() => {
				    	UserAuthenticationService.getCurrentUser()
				    		.then((user) => {
				    			// if logged in user === selected user, header needs reloading to update logged in user
				    			if (user._id === $scope.selectedUser._id){ 
				    				$window.location.reload();
				    			} else {
				    				$scope.firstName = $scope.selectedUser.name.first;	// sets the first name label to edited ones
				    				$scope.enableViewChanges = true;
				    			}
				    		})
				    	ngToast.create({
				    		className: 'success',
				    		content: `User was successfully edited. `
				    	});
					});
			}
		}


		$scope.onProcessSettingsUserData = () => {	// processing before submitting edited user settings
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			EditSettingsUserService.submitModifiedUser($scope.selectedUser)
				.then(() => {
					ngToast.create({
			    		className: 'success',
			    		content: `User Settings was successfully changed. `
			    	});
				});
		}
	}

})();