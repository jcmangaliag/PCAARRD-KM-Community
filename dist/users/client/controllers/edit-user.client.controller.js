'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('users').controller('EditUserController', EditUserController);

	EditUserController.$inject = ['$scope', '$window', '$stateParams', '$q', 'UserAuthenticationService', 'UserService', 'SharedUploadService', 'EditUserService', 'ngToast'];

	function EditUserController($scope, $window, $stateParams, $q, UserAuthenticationService, UserService, SharedUploadService, EditUserService, ngToast) {

		UserService.getOneUser($stateParams.userID).then(function (result) {
			$scope.selectedUser = result;
			$scope.selectedMonth = (0, _moment2.default)($scope.selectedUser.birthdate, 'MMMM Do YYYY').format('MMMM');
			$scope.selectedDay = (0, _moment2.default)($scope.selectedUser.birthdate, 'MMMM Do YYYY').format('D');
			$scope.selectedYear = (0, _moment2.default)($scope.selectedUser.birthdate, 'MMMM Do YYYY').format('YYYY');
		}, function (error) {
			// show 404 not found page
		});

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

		$scope.onProcessEditedUserData = function () {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			$scope.selectedUser.birthdate = $scope.selectedMonth + ' ' + $scope.selectedDay + ' ' + $scope.selectedYear;

			if ($scope.selectedPhoto && $scope.selectedPhoto.length > 0) {
				$scope.progressBarON = true;
				SharedUploadService.uploadPhoto($scope.selectedPhoto[0]).then(function (result) {
					// after uploading user photo
					$scope.progressBarON = false;
					$scope.selectedUser.photo = result.data.image;
					return EditUserService.submitEditedUser($scope.selectedUser);
				}, function (error) {
					$scope.progressBarON = false;
					ngToast.create({
						className: 'danger',
						content: 'Error: ' + error.data.message
					});

					return $q.reject(error);
				}).then(function () {
					// after submitting edited user
					ngToast.create({
						className: 'success',
						content: 'User was successfully edited. '
					});
					$window.location.reload();
				});
			} else {
				EditUserService.submitEditedUser($scope.selectedUser).then(function () {
					UserAuthenticationService.getCurrentUser().then(function (user) {
						if (user._id === $scope.selectedUser._id) {
							$window.location.reload();
						} else {
							$scope.enableViewChanges = true;
						}
					});
					ngToast.create({
						className: 'success',
						content: 'User was successfully edited. '
					});
				});
			}
		};
	}
})();