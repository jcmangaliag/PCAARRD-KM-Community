import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.factory('EditSettingsGroupService', EditSettingsGroupService);

	EditSettingsGroupService.$inject = ['$http', '$q'];

	function EditSettingsGroupService ($http, $q) {

		const submitModifiedGroup = (updatedFields) => {
			const deferred = $q.defer();

			$http.put(`/api/groups/${updatedFields.handle}`, updatedFields)
			.then(response => {
				deferred.resolve(response);
			});

			return deferred.promise;
		}
	
		return {
			submitModifiedGroup
		};
	}

})();

