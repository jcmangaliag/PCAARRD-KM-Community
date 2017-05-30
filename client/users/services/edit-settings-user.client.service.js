import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('users')
		.factory('EditSettingsUserService', EditSettingsUserService);

	EditSettingsUserService.$inject = ['$http', '$q', 'UserAuthenticationService'];

	function EditSettingsUserService ($http, $q, UserAuthenticationService) {

		const submitModifiedUser = (updatedFields) => {
			const deferred = $q.defer();

			$http.put(`/api/users/${updatedFields._id}`, updatedFields)
			.then(response => {
				deferred.resolve(response);
			});

			return deferred.promise;
		}
	
		return {
			submitModifiedUser
		};
	}

})();

