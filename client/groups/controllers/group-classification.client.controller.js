import _ from 'lodash/lodash.min';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('GroupClassificationController', GroupClassificationController);

	GroupClassificationController.$inject = ['$scope', '$state', 'GroupClassificationService', 'GroupService', 'SharedPaginationService', '$filter', 'ngToast', 'UserAuthenticationService'];

	function GroupClassificationController ($scope, $state, GroupClassificationService, GroupService, SharedPaginationService, $filter, ngToast, UserAuthenticationService) {

		/* for Add Group Classification */

		$scope.addGroupClassificationFormData = {};

		$scope.isp = { 
			enable: false
		};

		$scope.MIN_ISP = 1;
		$scope.addedISPs = [''];

		$scope.toggleISP = () => {
			$scope.clearISPs();
			$scope.isp.enable = !$scope.isp.enable;
		}

		$scope.addISP = () => {
			$scope.addedISPs.push('');
		}

		$scope.removeISP = () => {
			if ($scope.addedISPs.length > $scope.MIN_ISP){
				$scope.addedISPs.pop();
			}
		}

		$scope.clearISPs = () => {
			$scope.addedISPs.length = 0;
			$scope.addedISPs.push('');
		}

		$scope.clearGroupClassificationForm = () => {
			$scope.addGroupClassificationFormData = null;
		}

		// Industry-based Classification

		$scope.validateExistingGroupClassification = (formData) => {
			GroupClassificationService.getAllGroupClassifications();

			return $scope.groupClassifications.contents.map((item) => {
				if (item.type === "Industry-based")
					return (item.specificCommodity || item.isp).toLowerCase();
			}).indexOf((formData.specificCommodity || formData.isp).toLowerCase());
		}

		$scope.onProcessIndustryClassificationForm = () => {
			const existingGroupClassification = $scope.validateExistingGroupClassification($scope.addGroupClassificationFormData);

			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			if (existingGroupClassification < 0){	// the specific commodity or isp does not exist
				$scope.addGroupClassificationFormData.isUsed = false;
				$scope.addGroupClassificationFormData.type = "Industry-based";

				if (!$scope.addGroupClassificationFormData.specificCommodity)
					$scope.addGroupClassificationFormData.specificCommodity = null;

				GroupClassificationService.submitGroupClassification($scope.addGroupClassificationFormData)
				.then(() => {
					$scope.clearGroupClassificationForm();
					$scope.clearISPs();
				});
			} else {
				ngToast.create({
		    		className: 'danger',
		    		content: `Error: The Specific Commodity or ISP already exists!`
		    	});
		    	$scope.searchClassificationsValue = "";
			}
		}

		// R&D and Tech Transfer-based Classification

		$scope.validateExistingRDClassification = (formData) => {
			GroupClassificationService.getAllGroupClassifications();

			return $scope.groupClassifications.contents.map((item) => { 
				if (item.type === "R&D and Tech Transfer-based") 
					return item.organization.toLowerCase(); 
			}).indexOf((formData.organization).toLowerCase());
		}

		$scope.onProcessRDClassificationForm = () => {
			const existingRDClassification = $scope.validateExistingRDClassification($scope.addGroupClassificationFormData);

			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			if (existingRDClassification < 0){	// the organization does not exist
				$scope.addGroupClassificationFormData.isUsed = false;
				$scope.addGroupClassificationFormData.type = "R&D and Tech Transfer-based";

				if ($scope.isp.enable){
					$scope.addGroupClassificationFormData.isps = $scope.addedISPs;
				}

				GroupClassificationService.submitGroupClassification($scope.addGroupClassificationFormData)
				.then(() => {
					$scope.clearGroupClassificationForm();
					$scope.clearISPs();
				});
			} else {
				ngToast.create({
		    		className: 'danger',
		    		content: `Error: The Organization already exists!`
		    	});
			}
		}



		/* for Edit and View Group Classifications */

		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.classificationsPerPage = 10;

		$scope.editedGroupClassificationFormData = null;
		$scope.editType = null;
		$scope.sortGroupClassificationBy = ['type', 'industry', 'sector', 'isp', 'specificCommodity', 'organization', 'isps[0]'];
		$scope.sortReverse = false;

		$scope.changeSort = (groupClassificationFields) => {
			$scope.sortReverse = (_.isEqual($scope.sortGroupClassificationBy, groupClassificationFields))? !$scope.sortReverse : false;
			$scope.sortGroupClassificationBy = groupClassificationFields;
		} 

		$scope.getExistingGroupClassification = (existingGroupClassificationIndex) => {
			GroupClassificationService.getAllGroupClassifications();

			return $scope.groupClassifications.contents[existingGroupClassificationIndex];
		}
		
		$scope.onEditGroupClassification = (groupClassification) => {
			$scope.editedGroupClassificationFormData = _.cloneDeep(groupClassification);
			$scope.editType = groupClassification.type === "Industry-based"? "industry-based" : "rd-based";
		}

		$scope.isEditingClassification = (groupClassificationID) => {
			return $scope.editedGroupClassificationFormData && ($scope.editedGroupClassificationFormData._id === groupClassificationID);
		}


		$scope.onProcessEditedIndustryClassification = () => {
			const existingGroupClassification = $scope.validateExistingGroupClassification($scope.editedGroupClassificationFormData);

			if (existingGroupClassification < 0 || $scope.getExistingGroupClassification(existingGroupClassification)._id === $scope.editedGroupClassificationFormData._id){	
				const updatedFields = {
					industry: $scope.editedGroupClassificationFormData.industry,
					sector: $scope.editedGroupClassificationFormData.sector,
					isp: $scope.editedGroupClassificationFormData.isp,
				};

				updatedFields.specificCommodity = $scope.editedGroupClassificationFormData.specificCommodity || null;

				GroupClassificationService.updateGroupClassification($scope.editedGroupClassificationFormData._id, updatedFields)
				.then(() => {
					$scope.editedGroupClassificationFormData = null;
					$scope.editType = null;

					ngToast.create({
			    		className: 'success',
			    		content: `The Group Classification was successfully updated.`
			    	});

			    	$scope.searchClassificationsValue = "";
				});

			} else {
				ngToast.create({
		    		className: 'danger',
		    		content: `Error: The Specific Commodity or ISP already exists!`
		    	});
			}
		}

		$scope.onProcessEditedRDClassification = () => {
			const existingRDClassification = $scope.validateExistingRDClassification($scope.editedGroupClassificationFormData);

			if (existingRDClassification < 0 || $scope.getExistingGroupClassification(existingRDClassification)._id === $scope.editedGroupClassificationFormData._id){	
				const updatedFields = {
					organization: $scope.editedGroupClassificationFormData.organization,
					isps: $scope.editedGroupClassificationFormData.isps? $scope.editedGroupClassificationFormData.isps.split(',') : []
				};

				GroupClassificationService.updateGroupClassification($scope.editedGroupClassificationFormData._id, updatedFields)
				.then(() => {
					$scope.editedGroupClassificationFormData = null;
					$scope.editType = null;

					ngToast.create({
			    		className: 'success',
			    		content: `The Group Classification was successfully updated.`
			    	});

			    	$scope.searchClassificationsValue = "";
				});

			} else {
				ngToast.create({
		    		className: 'danger',
		    		content: `Error: The Organization already exists!`
		    	});
			}
		}

		$scope.onProcessEditedGroupClassification = () => {
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			if ($scope.editedGroupClassificationFormData.type === "Industry-based"){
				$scope.onProcessEditedIndustryClassification();
			} else {
				$scope.onProcessEditedRDClassification();
			}
		}

		$scope.disableSave = () => {
			if ($scope.editedGroupClassificationFormData.type === "Industry-based"){
				return (!$scope.editedGroupClassificationFormData.industry || !$scope.editedGroupClassificationFormData.sector || !$scope.editedGroupClassificationFormData.isp);
			} else {
				return (!$scope.editedGroupClassificationFormData.organization);
			}
		}

		$scope.cancelEditGroupClassification = () => {
			$scope.editedGroupClassificationFormData = null;
			$scope.editType = null;
		}

		$scope.onDeleteOneGroupClassification = (groupClassification) => {
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			GroupClassificationService.deleteOneGroupClassification(groupClassification);
		}

		$scope.goToGroup = (groupClassificationID) =>{
			const groupIndex = $scope.groups.contents.map((group) => group.classification._id).indexOf(groupClassificationID);
			$state.go('oneGroup', {handle:  $scope.groups.contents[groupIndex].handle});
		}

		$scope.$watch('searchClassificationsValue', function(value){ 
			if ($scope.groupClassifications){
				$scope.groupClassifications.contents = $filter('filter')($scope.groupClassificationsCopy.contents, value);
				$scope.paginate.currentPage = 1;
			}
    	});

		GroupClassificationService.getAllGroupClassifications();
		$scope.groupClassifications = GroupClassificationService.getGroupClassificationList();
		$scope.groupClassificationsCopy = GroupClassificationService.getGroupClassificationListCopy();
		GroupService.getAllGroups();
		$scope.groups = GroupService.getGroupList();
	}

})();