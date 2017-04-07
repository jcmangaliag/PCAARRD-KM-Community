import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('GroupClassificationController', GroupClassificationController);

	GroupClassificationController.$inject = ['$scope', 'GroupClassificationService', 'SharedPaginationService', '$filter'];

	function GroupClassificationController ($scope, GroupClassificationService, SharedPaginationService, $filter) {
		const {submitGroupClassification} = GroupClassificationService;
		$scope.submitGroupClassification = _.partial(submitGroupClassification);

		$scope.addGroupClassificationFormData = {};
		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.classificationsPerPage = 10;

		$scope.clearGroupClassificationForm = () => {
			$scope.addGroupClassificationFormData = null;
		}

		$scope.onProcessGroupClassificationForm = () => {
			GroupClassificationService.submitGroupClassification($scope.addGroupClassificationFormData)
			.then(() => {
				$scope.clearGroupClassificationForm();
			});
		}

		$scope.$watch('searchClassificationsValue', function(value){ 
			if ($scope.groupClassifications){
				GroupClassificationService.getAllGroupClassifications()
					.then(() => {
						$scope.groupClassifications.contents = $filter('filter')($scope.groupClassificationsCopy.contents, value);
						$scope.paginate.currentPage = 1;
					}, (error) => {
						// problem with loading posts
					});
			}
    	});

		GroupClassificationService.getAllGroupClassifications();
		$scope.groupClassifications = GroupClassificationService.getGroupClassificationList();
		$scope.groupClassificationsCopy = GroupClassificationService.getGroupClassificationListCopy();
	}

})();