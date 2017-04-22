import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('users')
		.controller('UserAuthenticationController', UserAuthenticationController);

	UserAuthenticationController.$inject = ['$scope', '$state', 'UserAuthenticationService', 'ngToast'];

	function UserAuthenticationController ($scope, $state, UserAuthenticationService, ngToast) {
		$scope.addUserFormData = {};
		$scope.adminRegistration = { accessKey: "a3f69f54", allow: false};

		$scope.validateAdminRegistration = () => {
			if ($scope.adminRegistration.enteredAccessKey === $scope.adminRegistration.accessKey){
				$scope.adminRegistration.allow = true;
			} else {
				$scope.adminRegistration.enteredAccessKey = "";

				ngToast.create({
		    		className: 'danger',
		    		content: `Error: Invalid Access Key!`
		    	});
			}
		}

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

		$scope.clearUserFormData = () => {
			$scope.addUserFormData = null;
			$scope.addUserFormData =  { name: {} };
			$scope.selectedMonth = $scope.selectedDay = $scope.selectedYear = $scope.enteredPassword = $scope.reenteredPassword = "";
		}

		$scope.onProcessUserData = () => {
			if($scope.enteredPassword !== $scope.reenteredPassword){
				ngToast.create({
		    		className: 'danger',
		    		content: `Error: Passwords do not match`
		    	});

		    	return;
			}

			$scope.addUserFormData.isAdmin = ($scope.adminRegistration.allow)? true : false;
			$scope.addUserFormData.dateJoined = moment().format('MMMM Do YYYY, h:mm:ss a');
			$scope.addUserFormData.birthdate = `${$scope.selectedMonth} ${$scope.selectedDay} ${$scope.selectedYear}`;

			UserAuthenticationService.register($scope.addUserFormData, $scope.reenteredPassword)
				.then(() => {
					$state.go("communityFeed");
				});
		}

		$scope.onProcessLoginData = () => {
			UserAuthenticationService.login($scope.loginData)
				.then(() => {
					$state.go("communityFeed");
				});
		}
	}

})();