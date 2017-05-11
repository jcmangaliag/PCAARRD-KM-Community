'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('groups').factory('EditSettingsGroupService', EditSettingsGroupService);

	EditSettingsGroupService.$inject = ['$http', '$q'];

	function EditSettingsGroupService($http, $q) {

		var submitModifiedGroup = function submitModifiedGroup(updatedFields) {
			var deferred = $q.defer();

			$http.put('/api/groups/' + updatedFields.handle, updatedFields).then(function (response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		};

		return {
			submitModifiedGroup: submitModifiedGroup
		};
	}
})();