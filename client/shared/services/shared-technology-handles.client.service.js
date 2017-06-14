import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('shared')
		.factory('SharedTechnologyHandlesService', SharedTechnologyHandlesService);

	SharedTechnologyHandlesService.$inject = ['$http', '$q'];

	function SharedTechnologyHandlesService ($http, $q) {

		const getTechnologies = () => {	// get all technologies from other API
			const deferred = $q.defer();

			$http.get(`https://technology-dashboard-api.herokuapp.com/technologies`)
			.then((response) => {
				deferred.resolve(response.data);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}


		return {
			getTechnologies
		};
	}

})();

