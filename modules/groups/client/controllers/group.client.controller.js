import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('GroupController', GroupController);

	GroupController.$inject = ['$scope', '$state', '$stateParams', 'GroupClassificationService', 'ViewGroupsCategoriesService', 'GroupService', 'SharedPaginationService', '$filter'];

	function GroupController ($scope, $state, $stateParams, GroupClassificationService, ViewGroupsCategoriesService, GroupService, SharedPaginationService, $filter) {
		/* for View One Group */
		$scope.fullGroupDescription = false;
		$scope.readGroupDescription = "Read More";
		$scope.DESCRIPTION_LIMIT = 1000;
		$scope.descriptionSize = $scope.DESCRIPTION_LIMIT;

		$scope.$watch(() => {
		    return $state.$current.name;
		}, (newCurrentStateName) => {
		    $scope.viewOnePost = $state.current.name.indexOf('oneGroup.viewOne') >= 0? true: false;
		});

		$scope.toggleGroupDescription = () => {
			$scope.fullGroupDescription = !$scope.fullGroupDescription;
			$scope.readGroupDescription = $scope.readGroupDescription == "Read Less"? "Read More" : "Read Less";
			$scope.descriptionSize = $scope.descriptionSize === $scope.DESCRIPTION_LIMIT? undefined : $scope.DESCRIPTION_LIMIT;
		}

		/* for View One and View All Groups */
		$scope.getGroupData = () => {
			if ($stateParams.handle){	// if viewing one group
				GroupService.getOneGroup($stateParams.handle)
				.then((result) => {
					$scope.selectedGroup = result;
				}, (error) => {
					// show 404 not found page
				});
			} else {
				const currentViewGroupsCategory = ViewGroupsCategoriesService.getCurrentViewGroupsCategory().category;
				ViewGroupsCategoriesService.retrieveGroupsByCategory(currentViewGroupsCategory);
				$scope.groups = GroupService.getGroupList();
				$scope.groupsCopy = GroupService.getGroupListCopy();

				$scope.paginate = _.cloneDeep(SharedPaginationService);
				$scope.paginate.currentPage = 1;
				$scope.paginate.groupsPerPage = 4;
			}
		}

		$scope.checkGroupMembership = (groupMembers) => {
			return groupMembers.indexOf("Mark's id") > -1? true: false;	// make this dynamic
		}

		$scope.$watch('searchGroupsValue', function(value){ 
			if ($scope.groups){
				const currentViewGroupsCategory = ViewGroupsCategoriesService.getCurrentViewGroupsCategory().category;
				ViewGroupsCategoriesService.retrieveGroupsByCategory(currentViewGroupsCategory)
					.then(() => {
						$scope.groups.contents = $filter('filter')($scope.groupsCopy.contents, value);
						$scope.paginate.currentPage = 1;
					}, (error) => {
						// problem with loading group
					});
			}
    	});

    	$scope.resetSearchGroup = () => {
    		$scope.searchGroupsValue = "";
    	}

    	$scope.resetGroupsCurrentPage = () => {
			$scope.paginate.currentPage = 1;
		}

		$scope.getGroupData();

		/* for Create Group */
		$scope.addGroupFormData = { classification: "" };

		$scope.generateGroupNameAndHandle = (classification) => {
			$scope.addGroupFormData.name = (classification && (classification.specificCommodity || classification.isp)) || "";
			$scope.addGroupFormData.handle = $scope.addGroupFormData.name.replace(/\s/g, "").toLowerCase();
		}

		$scope.onProcessGroupData = () => {
			$scope.addGroupFormData.admin = ["Mark's id"];	// change this later
			$scope.addGroupFormData.members = ["Mark's id", "Tomas's id"]; // change this later
			$scope.addGroupFormData.postsCount = {
				advertisement: 0,
				question: 0,
				others: 0,
				news: 0,
				report: 0,
				event: 0,
				media: 0,
				total: 0
			};
			$scope.addGroupFormData.dateCreated = moment().format('MMMM Do YYYY, h:mm:ss a');
			$scope.addGroupFormData.photo = "/cfs/files/images/vST2rHem64Lhn5YLd";	// change this later
			$scope.addGroupFormData.coverPhoto = "/cfs/files/images/yST2rHsx64Lhn5YLf";	// change this later
			delete $scope.addGroupFormData.classification.isUsed;
			delete $scope.addGroupFormData.classification.__v;
			const classificationID = $scope.addGroupFormData.classification._id;

			GroupService.submitGroup($scope.addGroupFormData)
			.then(() => {
				GroupClassificationService.updateGroupClassification(classificationID, {isUsed: true});
				$scope.clearGroupForm();
			});
		}

		$scope.clearGroupForm = () => {
			$scope.addGroupFormData = null;
		}

		GroupClassificationService.getAllGroupClassifications();
		$scope.groupClassifications = GroupClassificationService.getGroupClassificationList();
		
	}

})();