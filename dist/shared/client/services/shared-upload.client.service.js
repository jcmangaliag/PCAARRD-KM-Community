'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('shared').factory('SharedUploadService', SharedUploadService);

	SharedUploadService.$inject = ['$http', 'ngToast', '$q'];

	function SharedUploadService($http, ngToast, $q) {

		var uploadFiles = function uploadFiles(selectedUploadFiles, uploadedFiles) {
			var deferred = $q.defer();

			for (var i = 0; i < selectedUploadFiles.length; i++) {
				var formData = new FormData();
				formData.append('sharedUploadFiles', selectedUploadFiles[i]);

				$http.post('/api/uploads/files', formData, {
					transformRequest: angular.identity,
					headers: { 'Content-Type': undefined }
				}).then(function (result) {
					if (result.data.success) {
						uploadedFiles.push(result.data.file);
						if (uploadedFiles.length === selectedUploadFiles.length) deferred.resolve(result);
					} else {
						deferred.reject(result);
					}
				});
			}

			return deferred.promise;
		};

		var uploadPhoto = function uploadPhoto(selectedUploadPhoto) {
			var deferred = $q.defer();

			var formData = new FormData();
			formData.append('sharedUploadPhoto', selectedUploadPhoto);

			$http.post('/api/uploads/image', formData, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			}).then(function (result) {
				if (result.data.success) {
					deferred.resolve(result);
				} else {
					deferred.reject(result);
				}
			});

			return deferred.promise;
		};

		return {
			uploadFiles: uploadFiles,
			uploadPhoto: uploadPhoto
		};
	}
})();