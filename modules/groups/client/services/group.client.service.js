import _ from 'lodash';

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

		const getAllGroups = () => {
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

		const getMyGroups = (userID) => {
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

		const getDiscoverGroups = (userID) => {
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

		const getSomeGroups = (groupHandlesList) => {
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

		const getUserAdministeredGroups = (userID) => {
			const deferred = $q.defer();
			
			$http.get(`/api/groups/administered/${userID}`)
			.then((response) => {
				deferred.resolve(response.data.groups);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getUserPendingGroups = (userID) => {
			const deferred = $q.defer();
			
			$http.get(`/api/groups/pending/${userID}`)
			.then((response) => {
				deferred.resolve(response.data.groups);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getOneGroup = (groupHandle) => {
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

		const submitGroup = (addGroupFormData) => {
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

		const removeAdmin = (userID, groupHandle) => {
			const deferred = $q.defer();

			$http.put(`/api/groups/${groupHandle}/remove-admin/${userID}`)
			.then(response => {
				deferred.resolve(response);
			}, (error) => {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		const addToGroupPendingMembersList = (userID, groupHandle) => {
			const deferred = $q.defer();

			$http.put(`/api/groups/${groupHandle}/add-to-pending-members/${userID}`)
			.then(response => {
				deferred.resolve(response);
			}, (error) => {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		const removeFromGroupPendingMembersList = (userID, groupHandle) => {
			const deferred = $q.defer();

			$http.put(`/api/groups/${groupHandle}/remove-from-pending-members/${userID}`)
			.then(response => {
				deferred.resolve(response);
			}, (error) => {
				deferred.reject(error);
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
			removeFromGroupPendingMembersList
		};
	}

})();

