'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('shared').factory('SharedTechnologyHandlesService', SharedTechnologyHandlesService);

	SharedTechnologyHandlesService.$inject = ['$http', '$q'];

	function SharedTechnologyHandlesService($http, $q) {

		var getTechnologies = function getTechnologies() {
			var deferred = $q.defer();

			$http.get('http://technology-dashboard-api.herokuapp.com/technologies').then(function (response) {
				deferred.resolve(response.data);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		return {
			getTechnologies: getTechnologies
		};
	}
})();