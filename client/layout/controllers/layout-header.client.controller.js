import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('layout')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', 'UserAuthenticationService', '$window'];

	function HeaderController ($scope, UserAuthenticationService, $window) {

		$scope.user = {
			logout: UserAuthenticationService.logout
		}

		$scope.$watch(() => {	// watches current logged in user
		    return UserAuthenticationService.getCurrentUserID();
		}, (userID) => {
			$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();
			if ($scope.user.isLoggedIn){
				$scope.eResourcesAccess = "downloads";	// e-resources link changes if logged in
				if ($scope.user.currentUser && userID && $scope.user.currentUser._id != userID){
					// if the page is not updated with the current user, it will reload to update
					$window.location.reload();
				}

				UserAuthenticationService.getCurrentUser()
			    	.then((result)=> {
			    		$scope.user.currentUser = result;	// gets all information about current user
			    	});
			} else {
				$scope.user.currentUser = null;
				$scope.eResourcesAccess = "";
			} 
		});
	}

})();