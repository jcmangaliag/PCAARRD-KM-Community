import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('CommunityHomeController', CommunityHomeController);

	CommunityHomeController.$inject = ['$scope', 'UserAuthenticationService'];

	function CommunityHomeController ($scope, UserAuthenticationService) {
		$scope.$watch(() => {
		    return UserAuthenticationService.isLoggedIn();
		}, (isLoggedIn) => {
		    $scope.user.isLoggedIn = isLoggedIn;
		});
	}

})();