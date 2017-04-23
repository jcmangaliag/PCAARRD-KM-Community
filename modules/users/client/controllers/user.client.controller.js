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

		$scope.getGroupInfo= (groupHandle) => {
			const groupIndex = $scope.groups.contents.map((group) => group.handle).indexOf(groupHandle);
			return groupIndex > -1? $scope.groups.contents[groupIndex] : '';
		}
	}

})();