'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('groups').controller('EditSettingsGroupController', EditSettingsGroupController);

	EditSettingsGroupController.$inject = ['$scope', '$state', '$stateParams', '$q', 'GroupService', 'UserAuthenticationService', 'UserService', 'SharedUploadService', 'EditSettingsGroupService', 'ngToast'];

	function EditSettingsGroupController($scope, $state, $stateParams, $q, GroupService, UserAuthenticationService, UserService, SharedUploadService, EditSettingsGroupService, ngToast) {

		GroupService.getOneGroup($stateParams.handle).then(function (result) {
			$scope.selectedGroup = result;
		}, function (error) {
			// show 404 not found page
		});

		// Edit Group

		$scope.uploadPhotoAndSubmitForm = function (photo, photoIdentifier) {
			$scope.progressBarON = true;
			SharedUploadService.uploadPhoto(photo).then(function (result) {
				$scope.progressBarON = false;
				$scope.selectedGroup[photoIdentifier] = result.data.image;
				return EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup);
			}, function (error) {
				$scope.progressBarON = false;
				ngToast.create({
					className: 'danger',
					content: 'Error: ' + error.data.message
				});

				return $q.reject(error);
			}).then(function () {
				ngToast.create({
					className: 'success',
					content: 'Group was successfully edited. '
				});
				$scope.enableViewChanges = true;
			});
		};

		$scope.onProcessEditedGroupData = function () {

			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			var uploadPhoto = false,
			    uploadCoverPhoto = false;

			if ($scope.selectedPhoto && $scope.selectedPhoto.length > 0) {
				uploadPhoto = true;
			}

			if ($scope.selectedCoverPhoto && $scope.selectedCoverPhoto.length > 0) {
				uploadCoverPhoto = true;
			}

			if (uploadPhoto && uploadCoverPhoto) {
				$scope.progressBarON = true;
				SharedUploadService.uploadPhoto($scope.selectedPhoto[0]).then(function (result) {
					// after uploading group photo
					$scope.selectedGroup.photo = result.data.image;

					return SharedUploadService.uploadPhoto($scope.selectedCoverPhoto[0]);
				}, function (error) {
					$scope.progressBarON = false;
					ngToast.create({
						className: 'danger',
						content: 'Error: ' + error.data.message
					});

					return $q.reject(error);
				}).then(function (result) {
					// after uploading group cover photo
					$scope.progressBarON = false;
					$scope.selectedGroup.coverPhoto = result.data.image;

					return EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup);
				}, function (error) {
					$scope.progressBarON = false;
					ngToast.create({
						className: 'danger',
						content: 'Error: ' + error.data.message
					});

					return $q.reject(error);
				}).then(function () {
					// after submitting edited group
					ngToast.create({
						className: 'success',
						content: 'Group was successfully edited. '
					});
					$scope.enableViewChanges = true;
				});
			} else if (uploadPhoto) {
				$scope.uploadPhotoAndSubmitForm($scope.selectedPhoto[0], "photo");
			} else if (uploadCoverPhoto) {
				$scope.uploadPhotoAndSubmitForm($scope.selectedCoverPhoto[0], "coverPhoto");
			} else {
				EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup).then(function () {
					ngToast.create({
						className: 'success',
						content: 'Group was successfully edited. '
					});
					$scope.enableViewChanges = true;
				});
			}
		};

		// Group Settings

		if ($state.$current.name === "oneGroupSettings") {
			UserService.getAllUsers();
			$scope.users = UserService.getUserList();
		}

		$scope.multipleFields = {
			admins: ['']
		};

		$scope.MIN_ADMIN = 1;

		$scope.newGroupAdmins = {
			enable: false
		};

		$scope.toggleAddNewGroupAdmins = function () {
			$scope.newGroupAdmins.enable = !$scope.newGroupAdmins.enable;
		};

		$scope.addField = function (fieldArray) {
			fieldArray.push('');
		};

		$scope.removeField = function (fieldArray, minField) {
			if (fieldArray.length > minField) {
				fieldArray.pop();
			}
		};

		$scope.clearMultipleFields = function () {
			_lodash2.default.forOwn($scope.multipleFields, function (fieldArray) {
				fieldArray.length = 0;
				fieldArray.push('');
			});
		};

		$scope.validateAdminEmailAddress = function (adminEmails) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = adminEmails[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var adminEmail = _step.value;

					if ($scope.users.contents.map(function (user) {
						return user.email;
					}).indexOf(adminEmail) < 0) {
						return adminEmail;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return true;
		};

		$scope.convertEmailToUserID = function (adminEmails) {
			var userList = $scope.users.contents;
			return adminEmails.map(function (adminEmail) {
				return userList[userList.map(function (user) {
					return user.email;
				}).indexOf(adminEmail)]._id;
			});
		};

		$scope.validateNewAdminsMembership = function (adminIDs, group) {
			for (var i = 0; i < adminIDs.length; i++) {
				var memberIndex = $scope.users.contents.map(function (user) {
					return user._id;
				}).indexOf(adminIDs[i]);
				if (memberIndex > -1 && $scope.users.contents[memberIndex].groupsJoined.indexOf(group.handle) < 0) {
					return i; // don't validate if the admin is not a member
				}
			}

			return true;
		};

		$scope.onProcessSettingsGroupData = function () {

			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			if ($scope.newGroupAdmins.enable) {
				var validatedEmails = $scope.validateAdminEmailAddress($scope.multipleFields.admins);
				if (validatedEmails !== true) {
					ngToast.create({
						className: 'warning',
						content: 'User ' + validatedEmails + ' does not exist!'
					});

					return;
				}

				var convertedAdmins = $scope.convertEmailToUserID($scope.multipleFields.admins);
				var validatedMembers = $scope.validateNewAdminsMembership(convertedAdmins, $scope.selectedGroup);
				if (validatedMembers !== true) {

					ngToast.create({
						className: 'warning',
						content: 'User ' + $scope.multipleFields.admins[validatedMembers] + ' is not a member of this group!'
					});

					return;
				}

				_lodash2.default.forEach(convertedAdmins, function (convertedAdmin) {
					if ($scope.selectedGroup.admin.indexOf(convertedAdmin) < 0) {
						$scope.selectedGroup.admin.push(convertedAdmin);
					}
				});
			}

			EditSettingsGroupService.submitModifiedGroup($scope.selectedGroup).then(function () {

				ngToast.create({
					className: 'success',
					content: 'Group Settings was successfully changed. '
				});

				$scope.enableViewChanges = true;
			});
		};
	}
})();