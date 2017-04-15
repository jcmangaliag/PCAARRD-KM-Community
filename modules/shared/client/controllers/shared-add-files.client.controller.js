(() => {
	'use strict';
	
	angular
		.module('shared')
		.controller('SharedAddFilesController', SharedAddFilesController);

	SharedAddFilesController.$inject = ['$scope'];

	function SharedAddFilesController ($scope) {

		$scope.selectedUploadFiles = [];

		$scope.setFilesLabel = () => {
			if ($scope.selectedUploadFiles.length > 0){
				return $scope.selectedUploadFiles.length > 1? `${$scope.selectedUploadFiles.length} files selected` : $scope.selectedUploadFiles[0].name;
			}
		}

		$scope.clearUploadFiles = () => {
			$scope.selectedUploadFiles.length = 0;
		}
	}

})();