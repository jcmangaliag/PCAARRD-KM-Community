import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('CommunityHomeController', CommunityHomeController);

	CommunityHomeController.$inject = ['$scope', 'UserAuthenticationService', 'GroupService'];

	function CommunityHomeController ($scope, UserAuthenticationService, GroupService) {
		$scope.$watch(() => {
		    return UserAuthenticationService.isLoggedIn();
		}, (isLoggedIn) => {
		    $scope.user.isLoggedIn = isLoggedIn;
		});

		$scope.user = {};
		$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

		if ($scope.user.isLoggedIn){
    		UserAuthenticationService.getCurrentUser()
		    	.then((result)=> {
		    		$scope.user.currentUser = result;
		    		$scope.loadUserGroups($scope.user.currentUser);
		    	});
    	}

		$scope.loadUserGroups = (selectedUser) => {
			if (selectedUser.groupsJoined.length > 0){	
				GroupService.getSomeGroups(selectedUser.groupsJoined)
					.then((groups) => {
						$scope.userGroups = groups;
					});
			} else {
				$scope.userGroups = [];
			}
		}
	}

})();