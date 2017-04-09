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
	
		return {
			getGroupList,
			getGroupListCopy,
			getAllGroups,
			submitGroup
		};
	}

})();

