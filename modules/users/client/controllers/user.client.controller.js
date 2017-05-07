import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('users')
		.controller('UserController', UserController);

	UserController.$inject = ['$scope', '$stateParams', 'UserService', 'UserAuthenticationService', 'GroupService', 'CommentService', 'PostService'];

	function UserController ($scope, $stateParams, UserService, UserAuthenticationService, GroupService, CommentService, PostService) {

		$scope.fullUserDescription = false;
		$scope.readUserDescription = "Read More";
		$scope.DESCRIPTION_LIMIT = 1000;
		$scope.descriptionSize = $scope.DESCRIPTION_LIMIT;
		$scope.user = {};
		$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

		if ($scope.user.isLoggedIn){
    		UserAuthenticationService.getCurrentUser()
		    	.then((result)=> {
		    		$scope.user.currentUser = result;
		    	});
    	}

		UserService.getOneUser($stateParams.userID)
			.then((result) => {
				$scope.selectedUser = result;
				$scope.loadUserGroups($scope.selectedUser);
				$scope.loadUserAdministeredGroups($scope.selectedUser);
				$scope.loadUserPendingGroups($scope.selectedUser);
				$scope.loadUserPostsCount($scope.selectedUser);
				$scope.loadUserCommentsCount($scope.selectedUser);
			}, (error) => {
				// show 404 not found page
			});

		$scope.toggleUserDescription = () => {
			$scope.fullUserDescription = !$scope.fullUserDescription;
			$scope.readUserDescription = $scope.readUserDescription == "Read Less"? "Read More" : "Read Less";
			$scope.descriptionSize = $scope.descriptionSize === $scope.DESCRIPTION_LIMIT? undefined : $scope.DESCRIPTION_LIMIT;
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

		$scope.loadUserAdministeredGroups = (selectedUser) => {	
			GroupService.getUserAdministeredGroups(selectedUser._id)
				.then((groups) => {
					$scope.userAdminGroups = groups;
				});
		}

		$scope.loadUserPendingGroups = (selectedUser) => {	
			GroupService.getUserPendingGroups(selectedUser._id)
				.then((groups) => {
					$scope.userPendingGroups = groups;
				});
		}

		$scope.loadUserPostsCount = (selectedUser) => {
			PostService.getAllPostsCountByUser(selectedUser._id)
				.then((postsLength) => {
					$scope.userPostsLength = postsLength;
				});
		}

		$scope.loadUserCommentsCount = (selectedUser) => {
			CommentService.getCommentsLengthByOneUser(selectedUser._id)
				.then((commentsLength) => {
					$scope.userCommentsLength = commentsLength;
				});
		}
	}

})();