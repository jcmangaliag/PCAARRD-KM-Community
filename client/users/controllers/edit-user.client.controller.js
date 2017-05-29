import _ from 'lodash/lodash.min';
import moment from 'moment';

(() => {
	'use strict';
	
	angular
		.module('users')
		.controller('EditUserController', EditUserController);

	EditUserController.$inject = ['$scope', '$window', '$stateParams', '$q', 'UserAuthenticationService', 'UserService', 'SharedUploadService', 'EditUserService', 'ngToast'];

	function EditUserController ($scope, $window, $stateParams, $q, UserAuthenticationService, UserService, SharedUploadService, EditUserService, ngToast) {

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
			.then((result) => {
				$scope.selectedUser = result;
				$scope.selectedMonth = moment($scope.selectedUser.birthdate, 'MMMM Do YYYY').format('MMMM');
				$scope.selectedDay = moment($scope.selectedUser.birthdate, 'MMMM Do YYYY').format('D');
				$scope.selectedYear = moment($scope.selectedUser.birthdate, 'MMMM Do YYYY').format('YYYY');
			}, (error) => {
				// show 404 not found page
			});

		$scope.getAllMonths = () => {
			return moment.months();
		}

		$scope.getAllDays = () => {
			let days = [];
			for (let i = 1; i <= 31; i++){
				days.push(i);
			}
			return days;
		}

		$scope.getAllYears = () => {
			let years = [];
			for (let i = moment().get('year'); i >= 1900; i--){
				years.push(i);
			}
			return years;
		}

		$scope.onProcessEditedUserData = () => {
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			$scope.selectedUser.birthdate = `${$scope.selectedMonth} ${$scope.selectedDay} ${$scope.selectedYear}`;

			if ($scope.selectedPhoto && $scope.selectedPhoto.length > 0){
				$scope.progressBarON = true;
				SharedUploadService.uploadPhoto($scope.selectedPhoto[0])
					.then((result) => {	// after uploading user photo
						$scope.progressBarON = false;
						$scope.selectedUser.photo = result.data.image;
						return EditUserService.submitEditedUser($scope.selectedUser);
					}, (error) => {
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
			} else {
				EditUserService.submitEditedUser($scope.selectedUser)
					.then(() => {
				    	UserAuthenticationService.getCurrentUser()
				    		.then((user) => {
				    			if (user._id === $scope.selectedUser._id){
				    				$window.location.reload();
				    			} else {
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
	}

})();