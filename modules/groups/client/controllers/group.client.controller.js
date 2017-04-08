(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('GroupController', GroupController);

	GroupController.$inject = ['$scope', '$state', 'GroupClassificationService'];

	function GroupController ($scope, $state, GroupClassificationService) {

		$scope.addGroupFormData = { classification: "" };

		$scope.autoScroll = { 
			status: false
		}

		$scope.generateGroupNameAndHandle = (classification) => {
			$scope.addGroupFormData.name = (classification && (classification.specificCommodity || classification.isp)) || "";
			$scope.addGroupFormData.handle = $scope.addGroupFormData.name.replace(/\s/g, "").toLowerCase();
		}

		$scope.$watch(() => {
		    return $state.$current.name;
		}, (newCurrentStateName) => {
		    $scope.viewOnePost = $state.current.name.indexOf('oneGroup.viewOne') >= 0? true: false;
		});

		$scope.autoScrollPost = (option) => {
			$scope.autoScroll.status = option;
		}

		GroupClassificationService.getAllGroupClassifications();
		$scope.groupClassifications = GroupClassificationService.getGroupClassificationList();
	}

})();