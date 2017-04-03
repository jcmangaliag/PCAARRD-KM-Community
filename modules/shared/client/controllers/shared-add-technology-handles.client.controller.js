(() => {
	'use strict';
	
	angular
		.module('shared')
		.controller('SharedAddTechnologyHandlesController', SharedAddTechnologyHandlesController);

	SharedAddTechnologyHandlesController.$inject = ['$scope'];

	function SharedAddTechnologyHandlesController ($scope) {
		$scope.technologyHandle = { 
			enable: false
		};

		$scope.MIN_TECHNOLOGY = 1;

		// get the existing technologies from API and store in techologiesList array
		// dummy technologies
		$scope.technologiesList = [
			'beacons', 
			'carrageenan', 
			'bioroe', 
			'diagnosticKit', 
			'milkfishFryCounter'
		];

		$scope.selectedTechnologies = [''];

		$scope.toggleTechnologyHandle = () => {
			$scope.technologyHandle.enable = !$scope.technologyHandle.enable;
		}

		$scope.addTechnologyHandle = () => {
			$scope.selectedTechnologies.push('');
		}

		$scope.removeTechnologyHandle = () => {
			if ($scope.selectedTechnologies.length > $scope.MIN_TECHNOLOGY){
				$scope.selectedTechnologies.pop();
			}
		}

		$scope.clearTechnologyHandles = () => {
			$scope.selectedTechnologies.length = 0;
			$scope.selectedTechnologies.push('');
		}
	}

})();