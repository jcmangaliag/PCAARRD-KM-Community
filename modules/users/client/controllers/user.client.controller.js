import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('users')
		.controller('UserController', UserController);

	UserController.$inject = ['$scope', '$stateParams', 'UserService', 'GroupService'];

	function UserController ($scope, $stateParams, UserService, GroupService) {
		UserService.getOneUser($stateParams.userID)
			.then((result) => {
				$scope.selectedUser = result;
				$scope.loadUserGroups($scope.selectedUser);
				$scope.loadUserAdministeredGroups($scope.selectedUser);
			}, (error) => {
				// show 404 not found page
			});

		$scope.fullUserDescription = false;
		$scope.readUserDescription = "Read More";
		$scope.DESCRIPTION_LIMIT = 1000;
		$scope.descriptionSize = $scope.DESCRIPTION_LIMIT;

		$scope.toggleUserDescription = () => {
			$scope.fullUserDescription = !$scope.fullUserDescription;
			$scope.readUserDescription = $scope.readUserDescription == "Read Less"? "Read More" : "Read Less";
			$scope.descriptionSize = $scope.descriptionSize === $scope.DESCRIPTION_LIMIT? undefined : $scope.DESCRIPTION_LIMIT;
		}

		$scope.loadUserGroups = (selectedUser) => {	
			GroupService.getSomeGroups(selectedUser.groupsJoined)
				.then((groups) => {
					$scope.userGroups = groups;
				});
		}

		$scope.loadUserAdministeredGroups = (selectedUser) => {	
			GroupService.getUserAdministeredGroups(selectedUser._id)
				.then((groups) => {
					$scope.userAdminGroups = groups;
				});
		}
	}

})();