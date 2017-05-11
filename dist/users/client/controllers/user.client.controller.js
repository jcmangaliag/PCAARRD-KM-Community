'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('users').controller('UserController', UserController);

	UserController.$inject = ['$scope', '$stateParams', 'UserService', 'UserAuthenticationService', 'GroupService', 'CommentService', 'PostService'];

	function UserController($scope, $stateParams, UserService, UserAuthenticationService, GroupService, CommentService, PostService) {

		$scope.fullUserDescription = false;
		$scope.readUserDescription = "Read More";
		$scope.DESCRIPTION_LIMIT = 1000;
		$scope.descriptionSize = $scope.DESCRIPTION_LIMIT;
		$scope.user = {};
		$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

		if ($scope.user.isLoggedIn) {
			UserAuthenticationService.getCurrentUser().then(function (result) {
				$scope.user.currentUser = result;
			});
		}

		UserService.getOneUser($stateParams.userID).then(function (result) {
			$scope.selectedUser = result;
			$scope.loadUserGroups($scope.selectedUser);
			$scope.loadUserAdministeredGroups($scope.selectedUser);
			$scope.loadUserPendingGroups($scope.selectedUser);
			$scope.loadUserPostsCount($scope.selectedUser);
			$scope.loadUserCommentsCount($scope.selectedUser);
		}, function (error) {
			// show 404 not found page
		});

		$scope.toggleUserDescription = function () {
			$scope.fullUserDescription = !$scope.fullUserDescription;
			$scope.readUserDescription = $scope.readUserDescription == "Read Less" ? "Read More" : "Read Less";
			$scope.descriptionSize = $scope.descriptionSize === $scope.DESCRIPTION_LIMIT ? undefined : $scope.DESCRIPTION_LIMIT;
		};

		$scope.loadUserGroups = function (selectedUser) {
			if (selectedUser.groupsJoined.length > 0) {
				GroupService.getSomeGroups(selectedUser.groupsJoined).then(function (groups) {
					$scope.userGroups = groups;
				});
			} else {
				$scope.userGroups = [];
			}
		};

		$scope.loadUserAdministeredGroups = function (selectedUser) {
			GroupService.getUserAdministeredGroups(selectedUser._id).then(function (groups) {
				$scope.userAdminGroups = groups;
			});
		};

		$scope.loadUserPendingGroups = function (selectedUser) {
			GroupService.getUserPendingGroups(selectedUser._id).then(function (groups) {
				$scope.userPendingGroups = groups;
			});
		};

		$scope.loadUserPostsCount = function (selectedUser) {
			PostService.getAllPostsCountByUser(selectedUser._id).then(function (postsLength) {
				$scope.userPostsLength = postsLength;
			});
		};

		$scope.loadUserCommentsCount = function (selectedUser) {
			CommentService.getCommentsLengthByOneUser(selectedUser._id).then(function (commentsLength) {
				$scope.userCommentsLength = commentsLength;
			});
		};
	}
})();