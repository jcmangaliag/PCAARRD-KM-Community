import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('shared')
		.factory('SharedUploadService', SharedUploadService);

	SharedUploadService.$inject = ['$http', 'ngToast', '$q'];

	function SharedUploadService ($http, ngToast, $q) {

		const uploadFiles = (selectedUploadFiles, uploadedFiles) => {
			const deferred = $q.defer();

			for (let i = 0; i < selectedUploadFiles.length; i++){	// uploads several files one by one
				const formData = new FormData();
				formData.append('sharedUploadFiles', selectedUploadFiles[i]);

				$http.post('/api/uploads/files', formData, {	// uploads the file itself
					transformRequest: angular.identity,
	            	headers: { 'Content-Type': undefined }
				}).then((result) => {
					if (result.data.success){
						uploadedFiles.push(result.data.file);	// pushes successfully uploaded files info to list
						if (uploadedFiles.length === selectedUploadFiles.length)
							deferred.resolve(result);
					} else {
						deferred.reject(result);
					}
				});
			}

			return deferred.promise;
		}


		const uploadPhoto = (selectedUploadPhoto) => {
			const deferred = $q.defer();

			const formData = new FormData();
			formData.append('sharedUploadPhoto', selectedUploadPhoto);

			$http.post('/api/uploads/image', formData, {	// uploads the image itself
				transformRequest: angular.identity,
            	headers: { 'Content-Type': undefined }
			}).then((result) => {
				if (result.data.success){	// returns the info of successfully uploaded image
					deferred.resolve(result);
				} else {
					deferred.reject(result);
				}
			});

			return deferred.promise;
		}

		return {
			uploadFiles,
			uploadPhoto
		};
	}

})();

