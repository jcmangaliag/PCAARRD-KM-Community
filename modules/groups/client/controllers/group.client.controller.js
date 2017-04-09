import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('GroupController', GroupController);

	GroupController.$inject = ['$scope', '$state', 'GroupClassificationService', 'GroupService', 'SharedPaginationService', '$filter'];

	function GroupController ($scope, $state, GroupClassificationService, GroupService, SharedPaginationService, $filter) {
		/* for View One Group */
		$scope.autoScroll = { 
			status: false
		}

		$scope.$watch(() => {
		    return $state.$current.name;
		}, (newCurrentStateName) => {
		    $scope.viewOnePost = $state.current.name.indexOf('oneGroup.viewOne') >= 0? true: false;
		});

		$scope.autoScrollPost = (option) => {
			$scope.autoScroll.status = option;
		}

		/* for View All Groups */
		GroupService.getAllGroups();
		$scope.groups = GroupService.getGroupList();
		$scope.groupsCopy = GroupService.getGroupListCopy();
		
		$scope.paginate = _.cloneDeep(SharedPaginationService);
		$scope.paginate.currentPage = 1;
		$scope.paginate.groupsPerPage = 4;


/*		$scope.checkMyGroupStatus = () => {
			console.log("my groups status");
			//console.log($scope.paginate);
			//console.log($scope.groups);
			//$scope.groups.contents.pop();
			$scope.paginate.currentPage++;
		}

		$scope.checkDiscoverGroupStatus = () => {
			console.log("discover groups status");
			//console.log($scope.groups);
			//console.log($scope.paginate);
		}
*/

		$scope.$watch('searchGroupsValue', function(value){ 
			if ($scope.groups){
				GroupService.getAllGroups()
					.then(() => {
						$scope.groups.contents = $filter('filter')($scope.groupsCopy.contents, value);
						$scope.paginate.currentPage = 1;
					}, (error) => {
						// problem with loading group
					});
			}
    	});


		/* for Create Group */
		$scope.addGroupFormData = { classification: "" };

		$scope.generateGroupNameAndHandle = (classification) => {
			$scope.addGroupFormData.name = (classification && (classification.specificCommodity || classification.isp)) || "";
			$scope.addGroupFormData.handle = $scope.addGroupFormData.name.replace(/\s/g, "").toLowerCase();
		}

		$scope.onProcessGroupData = () => {

			$scope.addGroupFormData.admin = ["Mark's id"];	// change this later
			$scope.addGroupFormData.members = ["Mark's id", "Tomas's id"]; // change this later
			$scope.addGroupFormData.membersCount = $scope.addGroupFormData.members.length;
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