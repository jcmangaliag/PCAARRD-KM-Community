import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('shared')
		.factory('SharedUploadFilesService', SharedUploadFilesService);

	SharedUploadFilesService.$inject = ['$http', 'ngToast', '$q'];

	function SharedUploadFilesService ($http, ngToast, $q) {

		const uploadFiles = (selectedUploadFiles, uploadedFiles) => {
			const deferred = $q.defer();

			for (let i = 0; i < selectedUploadFiles.length; i++){
				const formData = new FormData();
				formData.append('sharedUploadFiles', selectedUploadFiles[i]);

				$http.post('/api/uploads/files', formData, {
					transformRequest: angular.identity,
	            	headers: { 'Content-Type': undefined }
				}).then((result) => {
					if (result.data.success){
						uploadedFiles.push(result.data.file);
						if (uploadedFiles.length === selectedUploadFiles.length)
							deferred.resolve(result);
					} else {
						deferred.reject(result);
					}
				});
			}

			return deferred.promise;
		}

		return {
			uploadFiles
		};
	}

})();

