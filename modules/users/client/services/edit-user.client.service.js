import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('users')
		.factory('EditUserService', EditUserService);

	EditUserService.$inject = ['$http', '$q', 'UserAuthenticationService'];

	function EditUserService ($http, $q, UserAuthenticationService) {

		const submitEditedUser = (updatedFields) => {
			const deferred = $q.defer();

			$http.put(`/api/users/${updatedFields._id}`, updatedFields)
			.then(response => {
				UserAuthenticationService.saveToken(response.data.token);
				deferred.resolve(response);
			});

			return deferred.promise;
		}
	
		return {
			submitEditedUser
		};
	}

})();

