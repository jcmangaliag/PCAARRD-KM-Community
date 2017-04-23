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
			}, (error) => {
				// show 404 not found page
			});

		GroupService.getAllGroups();
		$scope.groups = GroupService.getGroupList();

		$scope.fullUserDescription = false;
		$scope.readUserDescription = "Read More";
		$scope.DESCRIPTION_LIMIT = 1000;
		$scope.descriptionSize = $scope.DESCRIPTION_LIMIT;

		$scope.toggleUserDescription = () => {
			$scope.fullUserDescription = !$scope.fullUserDescription;
			$scope.readUserDescription = $scope.readUserDescription == "Read Less"? "Read More" : "Read Less";
			$scope.descriptionSize = $scope.descriptionSize === $scope.DESCRIPTION_LIMIT? undefined : $scope.DESCRIPTION_LIMIT;
		}

		$scope.getGroupInfo= (groupHandle) => {
			const groupIndex = $scope.groups.contents.map((group) => group.handle).indexOf(groupHandle);
			return groupIndex > -1? $scope.groups.contents[groupIndex] : '';
		}
	}

})();