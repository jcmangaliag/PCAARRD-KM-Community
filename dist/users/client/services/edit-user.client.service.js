'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('users').factory('EditUserService', EditUserService);

	EditUserService.$inject = ['$http', '$q', 'UserAuthenticationService'];

	function EditUserService($http, $q, UserAuthenticationService) {

		var submitEditedUser = function submitEditedUser(updatedFields) {
			var deferred = $q.defer();

			$http.put('/api/users/' + updatedFields._id, updatedFields).then(function (response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};

		return {
			submitEditedUser: submitEditedUser
		};
	}
})();