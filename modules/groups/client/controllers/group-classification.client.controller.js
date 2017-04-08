import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('GroupClassificationController', GroupClassificationController);

	GroupClassificationController.$inject = ['$scope', 'GroupClassificationService', 'SharedPaginationService', '$filter', 'ngToast'];

	function GroupClassificationController ($scope, GroupClassificationService, SharedPaginationService, $filter, ngToast) {
		const {deleteOneGroupClassification} = GroupClassificationService;
		$scope.deleteOneGroupClassification = _.partial(deleteOneGroupClassification);

		$scope.addGroupClassificationFormData = {};
		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.classificationsPerPage = 10;

		$scope.clearGroupClassificationForm = () => {
			$scope.addGroupClassificationFormData = null;
		}

		$scope.onProcessGroupClassificationForm = () => {
			GroupClassificationService.getAllGroupClassifications();
			const existing = $scope.groupClassifications.contents.map((item) => (item.specificCommodity || item.isp).toLowerCase())
							.indexOf(($scope.addGroupClassificationFormData.specificCommodity || $scope.addGroupClassificationFormData.isp).toLowerCase());

			if (existing < 0){	// the specific commodity or isp does not exist
				GroupClassificationService.submitGroupClassification($scope.addGroupClassificationFormData)
				.then(() => {
					$scope.clearGroupClassificationForm();
				});
			} else {
				ngToast.create({
		    		className: 'danger',
		    		content: `Error: The Specific Commodity or ISP already exists!`
		    	});
			}
		}

		$scope.$watch('searchClassificationsValue', function(value){ 
			if ($scope.groupClassifications){
				GroupClassificationService.getAllGroupClassifications()
					.then(() => {
						$scope.groupClassifications.contents = $filter('filter')($scope.groupClassificationsCopy.contents, value);
						$scope.paginate.currentPage = 1;
					}, (error) => {
						// problem with loading group classifications
					});
			}
    	});

		GroupClassificationService.getAllGroupClassifications();
		$scope.groupClassifications = GroupClassificationService.getGroupClassificationList();
		$scope.groupClassificationsCopy = GroupClassificationService.getGroupClassificationListCopy();
	}

})();