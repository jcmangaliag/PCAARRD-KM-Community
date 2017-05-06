import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('layout')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$scope', 'UserAuthenticationService'];

	function HeaderController ($scope, UserAuthenticationService) {
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
	}

})();