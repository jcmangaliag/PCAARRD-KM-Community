import _ from 'lodash/lodash.min';

(() => {
	'use strict';

	angular
		.module('groups')
		.factory('GroupService', GroupService);

	GroupService.$inject = ['$http', 'ngToast', '$q'];

	function GroupService ($http, ngToast, $q) {

		let groupList = { contents: [] }, groupListCopy = { contents: [] };

		const getGroupList = () => {
			return groupList;
		}

		const getGroupListCopy = () => {
			return groupListCopy;
		}

		const getAllGroups = () => {	// All Groups
			const deferred = $q.defer();

			$http.get('/api/groups')
			.then((response) => {
				groupList.contents = response.data.groups;
				groupListCopy.contents = _.toArray(response.data.groups);
				deferred.resolve(response.data.groups);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getMyGroups = (userID) => {	// My Groups
			const deferred = $q.defer();

			$http.get(`/api/groups/my-groups/${userID}`)
			.then((response) => {
				groupList.contents = response.data.groups;
				groupListCopy.contents = _.toArray(response.data.groups);

				deferred.resolve(response.data.groups);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getDiscoverGroups = (userID) => {	// Discover Groups
			const deferred = $q.defer();

			$http.get(`/api/groups/discover-groups/${userID}`)
			.then((response) => {
				groupList.contents = response.data.groups;
				groupListCopy.contents = _.toArray(response.data.groups);

				deferred.resolve(response.data.groups);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getSomeGroups = (groupHandlesList) => {	// get info of several groups
			const deferred = $q.defer();

			const groupsList = groupHandlesList.toString();
			$http.get(`/api/groups/some/${groupsList}`)
			.then((response) => {
				deferred.resolve(response.data.groups);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getUserAdministeredGroups = (userID) => {	// administered groups of user
			const deferred = $q.defer();

			$http.get(`/api/groups/administered/${userID}`)
			.then((response) => {
				deferred.resolve(response.data.groups);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getUserPendingGroups = (userID) => {	// pending groups of user
			const deferred = $q.defer();

			$http.get(`/api/groups/pending/${userID}`)
			.then((response) => {
				deferred.resolve(response.data.groups);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getOneGroup = (groupHandle) => {	// one group
			const deferred = $q.defer();

			$http.get(`/api/groups/${groupHandle}`)
			.then((response) => {
				deferred.resolve(response.data.group);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const updateGroup = (groupHandle, updatedFields) => {
			const deferred = $q.defer();
			$http.put(`/api/groups/${groupHandle}`, updatedFields)
			.then(response => {
				deferred.resolve(response);
				// should refresh the one group
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const submitGroup = (addGroupFormData) => {	// add group
			const deferred = $q.defer();

			$http.post('/api/groups', addGroupFormData)
			.then(response => {
				deferred.resolve(response);

				ngToast.create({
		    		className: 'success',
		    		content: `Group was successfully created. `
		    	});
			});

			return deferred.promise;
		}

		const removeAdmin = (userID, groupHandle) => {	// remove user to group's admin list
			const deferred = $q.defer();

			$http.put(`/api/groups/${groupHandle}/remove-admin/${userID}`)
			.then(response => {
				deferred.resolve(response);
			}, (error) => {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		const addToGroupPendingMembersList = (userID, groupHandle) => {	// add user to group's pending list
			const deferred = $q.defer();

			$http.put(`/api/groups/${groupHandle}/add-to-pending-members/${userID}`)
			.then(response => {
				deferred.resolve(response);
			}, (error) => {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		const removeFromGroupPendingMembersList = (userID, groupHandle) => {	// remove user to group's pending list
			const deferred = $q.defer();

			$http.put(`/api/groups/${groupHandle}/remove-from-pending-members/${userID}`)
			.then(response => {
				deferred.resolve(response);
			}, (error) => {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		const toggleIsPublishedGroup = (groupId, toggleIsPublishedData) => {		// publish a group
			const deferred = $q.defer();

			$http.put(`/api/groups/toggle-publish/${groupId}`, toggleIsPublishedData)
				.then((response) => {
					deferred.resolve(response);
				}, (response) => {
					deferred.reject(response);
				});

			return deferred.promise;
		}

		const removeGroup = (groupId) => { 		// delete a group
			const deferred = $q.defer();

			$http.delete(`/api/groups/toggle-publish/${groupId}`)
				.then((response) => {
					deferred.resolve(response);
				}, (response) => {
					deferred.reject(response);
				});

			return deferred.promise;
		}

		return {
			getGroupList,
			getGroupListCopy,
			getAllGroups,
			getMyGroups,
			getDiscoverGroups,
			getSomeGroups,
			getUserAdministeredGroups,
			getUserPendingGroups,
			getOneGroup,
			updateGroup,
			submitGroup,
			removeAdmin,
			addToGroupPendingMembersList,
			removeFromGroupPendingMembersList,
			toggleIsPublishedGroup,
			removeGroup
		};
	}

})();
