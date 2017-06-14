import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('shared')
		.controller('SharedAddTechnologyHandlesController', SharedAddTechnologyHandlesController);

	SharedAddTechnologyHandlesController.$inject = ['$scope', 'ngToast', 'SharedTechnologyHandlesService'];

	function SharedAddTechnologyHandlesController ($scope, ngToast, SharedTechnologyHandlesService) {
		$scope.technologyHandle = { 
			enable: false
		};

		$scope.MIN_TECHNOLOGY = 1;
		$scope.technologiesList = [];
		$scope.loadingTechnologiesBarON = true;

		SharedTechnologyHandlesService.getTechnologies()
			.then((technologies) => {	// get technologies from API on other site
				_.forEach(technologies, (technology) => $scope.technologiesList.push(technology.title));
				$scope.loadingTechnologiesBarON = false;
			}, (error) => {
				$scope.loadingTechnologiesBarON = false;
			});

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