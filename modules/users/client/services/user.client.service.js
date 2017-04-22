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

		const getOneUser = (email) => {
			const deferred = $q.defer();
			
			$http.get(`/api/users/${email}`)
			.then((response) => {
				deferred.resolve(response.data.user);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const updateUser = (email, updatedFields) => {
			const deferred = $q.defer();

			$http.put(`/api/users/${email}`, updatedFields)
			.then(response => {
				deferred.resolve(response);
				// should refresh the user or go somewhere else
			});

			return deferred.promise;
		}

		return {
			getUserList,
			getAllUsersByGroup,
			getAllUsers,
			getOneUser,
			updateUser
		};
	}

})();

