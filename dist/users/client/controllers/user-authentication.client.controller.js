'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('users').controller('UserAuthenticationController', UserAuthenticationController);

	UserAuthenticationController.$inject = ['$scope', '$state', 'UserAuthenticationService', 'UserService', 'ngToast'];

	function UserAuthenticationController($scope, $state, UserAuthenticationService, UserService, ngToast) {
		$scope.addUserFormData = {};
		$scope.adminRegistration = { allow: false };
		UserService.getAllUsers();
		$scope.users = UserService.getUserList();

		$scope.validateAdminRegistration = function () {
			UserAuthenticationService.allowAdminRegistration($scope.adminRegistration.enteredAccessKey).then(function (response) {
				$scope.adminRegistration.allow = response;
			}, function (response) {
				ngToast.create({
					className: 'warning',
					content: 'Invalid Access Key!'
				});

				$scope.adminRegistration.enteredAccessKey = "";
			});
		};

		$scope.getAllMonths = function () {
			return _moment2.default.months();
		};

		$scope.getAllDays = function () {
			var days = [];
			for (var i = 1; i <= 31; i++) {
				days.push(i);
			}
			return days;
		};

		$scope.getAllYears = function () {
			var years = [];
			for (var i = (0, _moment2.default)().get('year'); i >= 1900; i--) {
				years.push(i);
			}
			return years;
		};

		$scope.clearUserFormData = function () {
			$scope.addUserFormData = null;
			$scope.addUserFormData = { name: {} };
			$scope.selectedMonth = $scope.selectedDay = $scope.selectedYear = $scope.enteredPassword = $scope.reenteredPassword = "";
		};

		$scope.usedEmail = function () {
			return $scope.users.contents.map(function (user) {
				return user.email;
			}).indexOf($scope.addUserFormData.email) > -1 ? true : false;
		};

		$scope.onProcessUserData = function () {
			if ($scope.enteredPassword !== $scope.reenteredPassword) {
				ngToast.create({
					className: 'warning',
					content: 'Passwords do not match.'
				});
				return;
			}

			if ($scope.usedEmail()) {
				ngToast.create({
					className: 'warning',
					content: 'Email is already used.'
				});
				return;
			}

			$scope.addUserFormData.isAdmin = $scope.adminRegistration.allow ? true : false;
			$scope.addUserFormData.dateJoined = (0, _moment2.default)().format('MMMM Do YYYY, h:mm:ss a');
			$scope.addUserFormData.birthdate = $scope.selectedMonth + ' ' + $scope.selectedDay + ' ' + $scope.selectedYear;
			$scope.addUserFormData.photo = null;

			UserAuthenticationService.register($scope.addUserFormData, $scope.reenteredPassword, $scope.adminRegistration.enteredAccessKey).then(function () {
				ngToast.create({
					className: 'success',
					content: 'User was successfully registered.'
				});

				$state.go("communityHome");
			}, function (response) {
				ngToast.create({
					className: 'danger',
					content: 'Error: ' + response.data.message
				});
			});
		};

		$scope.onProcessLoginData = function () {
			UserAuthenticationService.login($scope.loginData).then(function () {
				$state.go("communityHome");
			}, function (response) {
				ngToast.create({
					className: 'warning',
					content: 'Incorrect username or password.'
				});
			});
		};
	}
})();