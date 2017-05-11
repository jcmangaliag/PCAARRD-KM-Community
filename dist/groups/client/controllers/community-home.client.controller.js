'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('groups').controller('CommunityHomeController', CommunityHomeController);

	CommunityHomeController.$inject = ['$scope', 'UserAuthenticationService', 'GroupService'];

	function CommunityHomeController($scope, UserAuthenticationService, GroupService) {
		$scope.$watch(function () {
			return UserAuthenticationService.isLoggedIn();
		}, function (isLoggedIn) {
			$scope.user.isLoggedIn = isLoggedIn;
		});

		$scope.user = {};
		$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

		if ($scope.user.isLoggedIn) {
			UserAuthenticationService.getCurrentUser().then(function (result) {
				$scope.user.currentUser = result;
				$scope.loadUserGroups($scope.user.currentUser);
			});
		}

		$scope.loadUserGroups = function (selectedUser) {
			if (selectedUser.groupsJoined.length > 0) {
				GroupService.getSomeGroups(selectedUser.groupsJoined).then(function (groups) {
					$scope.userGroups = groups;
				});
			} else {
				$scope.userGroups = [];
			}
		};
	}
})();