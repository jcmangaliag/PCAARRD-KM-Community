import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('GroupClassificationController', GroupClassificationController);

	GroupClassificationController.$inject = ['$scope', 'GroupClassificationService'];

	function GroupClassificationController ($scope, GroupClassificationService) {
		const {submitGroupClassification} = GroupClassificationService;
		$scope.submitGroupClassification = _.partial(submitGroupClassification);

		$scope.addGroupClassificationFormData = {};

		$scope.clearGroupClassificationForm = () => {
			$scope.addGroupClassificationFormData = null;
		}

		$scope.onProcessGroupClassificationForm = () => {
			GroupClassificationService.submitGroupClassification($scope.addGroupClassificationFormData)
			.then(() => {
				$scope.clearGroupClassificationForm();
			});
		}
	}

})();