'use strict';

(function () {
	'use strict';

	angular.module('shared').controller('SharedAddFilesController', SharedAddFilesController);

	SharedAddFilesController.$inject = ['$scope'];

	function SharedAddFilesController($scope) {

		$scope.selectedUploadFiles = [];

		$scope.setFilesLabel = function () {
			if ($scope.selectedUploadFiles.length > 0) {
				return $scope.selectedUploadFiles.length > 1 ? $scope.selectedUploadFiles.length + ' files selected' : $scope.selectedUploadFiles[0].name;
			}
		};

		$scope.clearUploadFiles = function () {
			$scope.selectedUploadFiles = [];
		};
	}
})();