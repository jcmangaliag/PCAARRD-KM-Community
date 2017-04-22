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
			isLoggedIn: UserAuthenticationService.isLoggedIn(),
			currentUser: UserAuthenticationService.getCurrentUser(),
			logout: UserAuthenticationService.logout
		}

		$scope.$watch(() => {
		    return UserAuthenticationService.isLoggedIn();
		}, (isLoggedIn) => {
		    $scope.user.isLoggedIn = isLoggedIn;
		});
	}

})();