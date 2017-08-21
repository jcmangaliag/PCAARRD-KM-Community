import _ from 'lodash/lodash.min';

(() => {
	'use strict';

	angular
		.module('groups')
		.controller('CommunityHomeController', CommunityHomeController);

	CommunityHomeController.$inject = ['$scope', 'UserAuthenticationService', 'GroupService', 'HomepageService'];

	function CommunityHomeController ($scope, UserAuthenticationService, GroupService, HomepageService) {
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

		$scope.loadUserGroups = (selectedUser) => {	// used in landing page where count of groups is stated
			if (selectedUser.groupsJoined.length > 0){
				GroupService.getSomeGroups(selectedUser.groupsJoined)
					.then((groups) => {
						$scope.userGroups = groups;
					});
			} else {
				$scope.userGroups = [];
			}
		}

		$scope.sliders = [];
		$scope.features = [];

		// Fetch slides from server
		HomepageService.getSliders()
			.then((result) => {
				$scope.sliders = result;
			});

		// Fetch slides from server
		HomepageService.getFeatures()
			.then((result) => {
				$scope.features = result;
			});
	}

})();
