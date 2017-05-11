'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('shared').controller('SharedAddTechnologyHandlesController', SharedAddTechnologyHandlesController);

	SharedAddTechnologyHandlesController.$inject = ['$scope', 'ngToast', 'SharedTechnologyHandlesService'];

	function SharedAddTechnologyHandlesController($scope, ngToast, SharedTechnologyHandlesService) {
		$scope.technologyHandle = {
			enable: false
		};

		$scope.MIN_TECHNOLOGY = 1;
		$scope.technologiesList = [];
		$scope.loadingTechnologiesBarON = true;

		SharedTechnologyHandlesService.getTechnologies().then(function (technologies) {
			_lodash2.default.forEach(technologies, function (technology) {
				return $scope.technologiesList.push(technology.title);
			});
			$scope.loadingTechnologiesBarON = false;
		}, function (error) {
			$scope.loadingTechnologiesBarON = false;
		});

		$scope.selectedTechnologies = [''];

		$scope.toggleTechnologyHandle = function () {
			$scope.technologyHandle.enable = !$scope.technologyHandle.enable;
		};

		$scope.addTechnologyHandle = function () {
			$scope.selectedTechnologies.push('');
		};

		$scope.removeTechnologyHandle = function () {
			if ($scope.selectedTechnologies.length > $scope.MIN_TECHNOLOGY) {
				$scope.selectedTechnologies.pop();
			}
		};

		$scope.clearTechnologyHandles = function () {
			$scope.selectedTechnologies.length = 0;
			$scope.selectedTechnologies.push('');
		};
	}
})();