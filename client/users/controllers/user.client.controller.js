import moment from 'moment';
import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('users')
		.controller('UserController', UserController);

	UserController.$inject = ['$scope', '$stateParams', 'UserService', 'UserAuthenticationService', 'GroupService', 'CommentService', 'PostService'];

	function UserController ($scope, $stateParams, UserService, UserAuthenticationService, GroupService, CommentService, PostService) {

		$scope.fullUserDescription = false;	// show full description if user profile's about is too long
		$scope.readUserDescription = "Read More";
		$scope.DESCRIPTION_LIMIT = 1000;	// shows default of 1000 characters in user profile's about
		$scope.descriptionSize = $scope.DESCRIPTION_LIMIT;
		$scope.user = {};
		$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

		if ($scope.user.isLoggedIn){
    		UserAuthenticationService.getCurrentUser()
		    	.then((result)=> {
		    		$scope.user.currentUser = result;	// get logged in user's info
		    	});
    	}

		UserService.getOneUser($stateParams.userID)
			.then((result) => {	// loads user data and other data related to the user
				$scope.selectedUser = result;
				$scope.loadUserGroups($scope.selectedUser);
				$scope.loadUserAdministeredGroups($scope.selectedUser);
				$scope.loadUserPendingGroups($scope.selectedUser);
				$scope.loadUserPostsCount($scope.selectedUser);
				$scope.loadUserCommentsCount($scope.selectedUser);
			}, (error) => {
				// show 404 not found page
			});

		$scope.toggleUserDescription = () => {	// toggles Read More or Read Less in very long user's about
			$scope.fullUserDescription = !$scope.fullUserDescription;
			$scope.readUserDescription = $scope.readUserDescription == "Read Less"? "Read More" : "Read Less";
			// description size limit can be removed if Read More is clicked
			$scope.descriptionSize = $scope.descriptionSize === $scope.DESCRIPTION_LIMIT? undefined : $scope.DESCRIPTION_LIMIT;
		}

		$scope.loadUserGroups = (selectedUser) => {	// load all groups of the user
			if (selectedUser.groupsJoined.length > 0){	
				GroupService.getSomeGroups(selectedUser.groupsJoined)
					.then((groups) => {
						$scope.userGroups = groups;
					});
			} else {
				$scope.userGroups = [];
			}
		}

		$scope.loadUserAdministeredGroups = (selectedUser) => {	// load administered groups of the user
			GroupService.getUserAdministeredGroups(selectedUser._id)
				.then((groups) => {
					$scope.userAdminGroups = groups;
				});
		}

		$scope.loadUserPendingGroups = (selectedUser) => {	// load pending groups of the user
			GroupService.getUserPendingGroups(selectedUser._id)
				.then((groups) => {
					$scope.userPendingGroups = groups;
				});
		}

		$scope.loadUserPostsCount = (selectedUser) => {	// load the number of posts of the user
			PostService.getAllPostsCountByUser(selectedUser._id)
				.then((postsLength) => {
					$scope.userPostsLength = postsLength;
				});
		}

		$scope.loadUserCommentsCount = (selectedUser) => {	// load the number of comments of the user
			CommentService.getCommentsLengthByOneUser(selectedUser._id)
				.then((commentsLength) => {
					$scope.userCommentsLength = commentsLength;
				});
		}
	}

})();