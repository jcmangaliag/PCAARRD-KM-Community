import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.factory('EditGroupService', EditGroupService);

	EditGroupService.$inject = ['$http', '$q'];

	function EditGroupService ($http, $q) {

		const submitEditedGroup = (updatedFields) => {
			const deferred = $q.defer();

			$http.put(`/api/groups/${updatedFields.handle}`, updatedFields)
			.then(response => {
				deferred.resolve(response);
			});

			return deferred.promise;
		}
	
		return {
			submitEditedGroup
		};
	}

})();

