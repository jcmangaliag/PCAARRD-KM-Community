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

		SharedTechnologyHandlesService.getTechnologies()
			.then((technologies) => {
				_.forEach(technologies, (technology) => $scope.technologiesList.push(technology.title));
			}, (error) => {
				ngToast.create({
		    		className: 'danger',
		    		content: `There is a problem with loading the technologies.`
		    	});
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