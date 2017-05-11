'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('layout').controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', 'UserAuthenticationService', '$window'];

	function HeaderController($scope, UserAuthenticationService, $window) {
		$scope.options = {
			showOptions: false
		};

		$scope.toggleOptions = function () {
			$scope.options.showOptions = !$scope.options.showOptions;
		};

		$scope.user = {
			logout: UserAuthenticationService.logout
		};

		$scope.$watch(function () {
			return UserAuthenticationService.getCurrentUserID();
		}, function (userID) {
			$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();
			if ($scope.user.isLoggedIn) {
				if ($scope.user.currentUser && userID && $scope.user.currentUser._id != userID) {
					// if the page is not updated with the current user, it will reload to update
					$window.location.reload();
				}

				UserAuthenticationService.getCurrentUser().then(function (result) {
					$scope.user.currentUser = result;
				});
			} else {
				$scope.user.currentUser = null;
			}
		});
	}
})();