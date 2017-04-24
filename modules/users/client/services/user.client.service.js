(() => {
	'use strict';
	
	angular
		.module('users')
		.factory('UserService', UserService);

	UserService.$inject = ['$http', '$q'];

	function UserService ($http, $q) {

		let userList = { contents: [] };

		const getUserList = () => {
			return userList;
		}

		const getAllUsersByGroup = (groupHandle) => {
			const deferred = $q.defer();

			$http.get(`/api/users/group/${groupHandle}`)
			.then((response) => {
				userList.contents = response.data.users;
				deferred.resolve(response.data.users);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getAllUsers = () => {
			const deferred = $q.defer();

			$http.get(`/api/users`)
			.then((response) => {
				userList.contents = response.data.users;
				deferred.resolve(response.data.users);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getOneUser = (userID) => {
			const deferred = $q.defer();
			
			$http.get(`/api/users/${userID}`)
			.then((response) => {
				deferred.resolve(response.data.user);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const joinGroup = (userID, groupHandle) => {
			const deferred = $q.defer();

			$http.put(`/api/users/${userID}/join-group/${groupHandle}`)
			.then(response => {
				deferred.resolve(response);
			});

			return deferred.promise;
		}

		const leaveGroup = (userID, groupHandle) => {
			const deferred = $q.defer();

			$http.put(`/api/users/${userID}/leave-group/${groupHandle}`)
			.then(response => {
				deferred.resolve(response);
			});

			return deferred.promise;
		}

		return {
			getUserList,
			getAllUsersByGroup,
			getAllUsers,
			getOneUser,
			joinGroup,
			leaveGroup
		};
	}

})();

