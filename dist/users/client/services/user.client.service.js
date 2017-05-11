'use strict';

(function () {
	'use strict';

	angular.module('users').factory('UserService', UserService);

	UserService.$inject = ['$http', '$q'];

	function UserService($http, $q) {

		var userList = { contents: [] };

		var getUserList = function getUserList() {
			return userList;
		};

		var getAllUsersByGroup = function getAllUsersByGroup(groupHandle) {
			var deferred = $q.defer();

			$http.get('/api/users/group/' + groupHandle).then(function (response) {
				userList.contents = response.data.users;
				deferred.resolve(response.data.users);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getAllUsers = function getAllUsers() {
			var deferred = $q.defer();

			$http.get('/api/users').then(function (response) {
				userList.contents = response.data.users;
				deferred.resolve(response.data.users);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getAllGroupAdminstrators = function getAllGroupAdminstrators(groupAdminsID) {
			var deferred = $q.defer();
			var groupAdmins = groupAdminsID.toString();
			$http.get('/api/users/group-adminstrators/' + groupAdmins).then(function (response) {
				deferred.resolve(response.data.users);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getAllGroupPendingMembers = function getAllGroupPendingMembers(groupPendingMembersID) {
			var deferred = $q.defer();
			var groupPendingMembers = groupPendingMembersID.toString();

			if (groupPendingMembersID.length > 0) {
				$http.get('/api/users/group-pending-members/' + groupPendingMembers).then(function (response) {
					deferred.resolve(response.data.users);
				}, function (response) {
					deferred.reject(response);
				});
			} else {
				deferred.resolve([]);
			}

			return deferred.promise;
		};

		var getOneUser = function getOneUser(userID) {
			var deferred = $q.defer();

			$http.get('/api/users/' + userID).then(function (response) {
				deferred.resolve(response.data.user);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var joinGroup = function joinGroup(userID, groupHandle) {
			var deferred = $q.defer();

			$http.put('/api/users/' + userID + '/join-group/' + groupHandle).then(function (response) {
				deferred.resolve(response);
			}, function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

		var leaveGroup = function leaveGroup(userID, groupHandle) {
			var deferred = $q.defer();

			$http.put('/api/users/' + userID + '/leave-group/' + groupHandle).then(function (response) {
				deferred.resolve(response);
			}, function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

		return {
			getUserList: getUserList,
			getAllUsersByGroup: getAllUsersByGroup,
			getAllUsers: getAllUsers,
			getAllGroupAdminstrators: getAllGroupAdminstrators,
			getAllGroupPendingMembers: getAllGroupPendingMembers,
			getOneUser: getOneUser,
			joinGroup: joinGroup,
			leaveGroup: leaveGroup
		};
	}
})();