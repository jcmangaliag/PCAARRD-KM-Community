import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('layout')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', 'UserAuthenticationService', '$window'];

	function HeaderController ($scope, UserAuthenticationService, $window) {
		$scope.options = {
			showOptions: false
		}

		$scope.toggleOptions = () =>{
			$scope.options.showOptions = !$scope.options.showOptions;
		}

		$scope.user = {
			logout: UserAuthenticationService.logout
		}

		$scope.$watch(() => {
		    return UserAuthenticationService.isLoggedIn();
		}, (isLoggedIn) => {
		    $scope.user.isLoggedIn = isLoggedIn;
		    if (isLoggedIn){
		    	UserAuthenticationService.getCurrentUser()
		    	.then((result)=> {
		    		$scope.user.currentUser = result;	
		    	});
		    }
		});

		$scope.goToDPITC = () => {
			$window.open("http://www.google.com", '_self');	// change to DPITC URL
		}
	}

})();