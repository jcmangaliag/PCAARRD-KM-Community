import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('GroupController', GroupController);

	GroupController.$inject = ['$scope', '$state', '$q', '$timeout', 'ngToast', '$stateParams', 'GroupClassificationService', 'ViewGroupsCategoriesService', 'GroupService', 'SharedPaginationService', 'UserAuthenticationService', 'UserService', '$filter'];

	function GroupController ($scope, $state, $q, $timeout, ngToast, $stateParams, GroupClassificationService, ViewGroupsCategoriesService, GroupService, SharedPaginationService, UserAuthenticationService, UserService, $filter) {
		
		/* for View One Group */

		$scope.fullGroupDescription = false;
		$scope.readGroupDescription = "Read More";
		$scope.DESCRIPTION_LIMIT = 1000;
		$scope.descriptionSize = $scope.DESCRIPTION_LIMIT;

		$scope.toggleGroupDescription = () => {
			$scope.fullGroupDescription = !$scope.fullGroupDescription;
			$scope.readGroupDescription = $scope.readGroupDescription == "Read Less"? "Read More" : "Read Less";
			$scope.descriptionSize = $scope.descriptionSize === $scope.DESCRIPTION_LIMIT? undefined : $scope.DESCRIPTION_LIMIT;
		}

		$scope.loadPostsAnalysis = () => {
			$scope.postsAnalysisChart = Highcharts.chart('group-posts-distribution-container', {
			    chart: {
			        polar: true,
			        type: 'line'
			    },
			    title: {
			        text: `No Group`
			    },
			    pane: {
			        size: '80%'
			    },
			    xAxis: {
			        categories: ['Media or URL', 'Others', 'News',
			                'Advertisement', 'Incident Report', 'Event', 'Question'],
			        tickmarkPlacement: 'on',
			        lineWidth: 0
			    },

			    yAxis: {
			        gridLineInterpolation: 'polygon',
			        lineWidth: 0,
			        min: 0
			    },


			    tooltip: {
			        shared: true,
			        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
			    },

			    series: [{
			        name: 'Number of Posts',
			        data: [0, 0, 0, 0, 0, 0, 0],
			        pointPlacement: 'on'
			    }]
			})
			$scope.postsAnalysisChart.setSize(330);
		}

		$scope.updatePostsAnalysis = () => {
			$scope.postsAnalysisChart.setTitle({text: `${$scope.selectedGroup.name} Posts`}, {text: 'Source: PCAARRD KM Community'});
			$scope.postsAnalysisChart.series[0].setData([
				$scope.selectedGroup.postsCount.media, 
				$scope.selectedGroup.postsCount.others,
				$scope.selectedGroup.postsCount.news,
				$scope.selectedGroup.postsCount.advertisement,  
				$scope.selectedGroup.postsCount.report, 			
				$scope.selectedGroup.postsCount.event, 
				$scope.selectedGroup.postsCount.question
			], true);
		}

		$scope.loadGroupAdmins = (userID) => {
			UserService.getOneUser(userID)
				.then((user) => {
					if (user.photo) {
						return user.photo.path.split('/')[1];
					} else {
						return '/layout/client/assets/images/11208269_1389692501358752_1755951646_n.jpg';
					}
				});
		}

		$scope.loadGroupAdmins = (groupAdminsID) => {	// load all info of group admins
			UserService.getAllGroupAdminstrators(groupAdminsID)
				.then((admins) => {
					$scope.groupAdmins = admins;
				});
		}


		/* for View One and View All Groups */

		$scope.setGroupsData = () => {
			const currentViewGroupsCategory = ViewGroupsCategoriesService.getCurrentViewGroupsCategory().category;
			ViewGroupsCategoriesService.retrieveGroupsByCategory(currentViewGroupsCategory);
			$scope.groups = GroupService.getGroupList();
			$scope.groupsCopy = GroupService.getGroupListCopy();

			$scope.paginate = _.cloneDeep(SharedPaginationService);
			$scope.paginate.currentPage = 1;
			$scope.paginate.groupsPerPage = 4;
		}

		$scope.getGroupData = () => {
			$scope.user = {};
			$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

			if ($stateParams.handle){	// if viewing one group

				GroupService.getOneGroup($stateParams.handle)	// load the group
					.then((result) => {
						$scope.selectedGroup = result;
						$scope.loadGroupAdmins($scope.selectedGroup.admin);

						$timeout(() => {
							$scope.loadPostsAnalysis();
							$scope.updatePostsAnalysis();
						}, 1000);
					}, (error) => {
						// show 404 not found page
					});

				UserAuthenticationService.getCurrentUser()	// load the current user
					.then((currentUser)=> {
			    		$scope.user.currentUser = currentUser;
			    	});


			} else if ($state.$current.name === "groups") {
				ViewGroupsCategoriesService.setUserID(null);
		    	if ($scope.user.isLoggedIn){
		    		UserAuthenticationService.getCurrentUser()
				    	.then((result)=> {
				    		ViewGroupsCategoriesService.setUserID(result._id);
				    		$scope.setGroupsData();
				    	});
		    	} else {	// for those not logged in
		    		ViewGroupsCategoriesService.setUserID("none");
		    		$scope.setGroupsData();
		    	}
			}
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

		if ($state.$current.name === "createGroup"){
			UserService.getAllUsers();
			$scope.users = UserService.getUserList();
		}

		$scope.addGroupFormData = { classification: "" };

		$scope.multipleFields = {
			admins: [''],
		};

		$scope.MIN_ADMIN = 1;

		$scope.addField = (fieldArray) => {
			fieldArray.push('');
		}

		$scope.removeField = (fieldArray, minField) => {
			if (fieldArray.length > minField){
				fieldArray.pop();
			}
		}

		$scope.clearMultipleFields = () => {
			_.forOwn($scope.multipleFields, (fieldArray) => { 
				fieldArray.length = 0;
				fieldArray.push('');
			});
		}

		$scope.generateGroupNameAndHandle = (classification) => {
			$scope.addGroupFormData.name = (classification && (classification.specificCommodity || classification.isp)) || "";
			$scope.addGroupFormData.handle = $scope.addGroupFormData.name.replace(/\s/g, "").toLowerCase();
		}

		$scope.validateAdminEmailAddress = (adminEmails) => {
			for (let adminEmail of adminEmails){
				if ($scope.users.contents.map((user) => user.email).indexOf(adminEmail) < 0){
					return adminEmail;
				}
			}
			
			return true;
		}

		$scope.convertEmailToUserID = (adminEmails) => {
			const userList = $scope.users.contents;
			return adminEmails.map((adminEmail) => {
					return userList[userList.map((user) => user.email).indexOf(adminEmail)]._id; 
				}
			);
		}

		$scope.onProcessGroupData = () => {
			const classificationID = $scope.addGroupFormData.classification._id;
			const groupHandle = $scope.addGroupFormData.handle;

			UserAuthenticationService.getCurrentUser()
				.then((result)=> {
		    		$scope.addGroupFormData.createdBy = result._id;	

		    		const validatedEmails = $scope.validateAdminEmailAddress($scope.multipleFields.admins);
					if (validatedEmails !== true){
						ngToast.create({
				    		className: 'danger',
				    		content: `Error: ${validatedEmails} does not exist!`
				    	});

				    	return $q.reject(`Error: ${validatedEmails} does not exist!`);
					}

					$scope.addGroupFormData.admin = $scope.convertEmailToUserID($scope.multipleFields.admins);
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

					$scope.addGroupFormData.membersCount = $scope.addGroupFormData.admin.length;
					$scope.addGroupFormData.dateCreated = moment().format('MMMM Do YYYY, h:mm:ss a');
					$scope.addGroupFormData.photo = null;
					$scope.addGroupFormData.coverPhoto = null;
					delete $scope.addGroupFormData.classification.isUsed;
					delete $scope.addGroupFormData.classification.__v;

					return GroupService.submitGroup($scope.addGroupFormData);
		    	})
		    	.then(()=> {
		    		GroupClassificationService.updateGroupClassification(classificationID, {isUsed: true});

					_.forEach($scope.addGroupFormData.admin, (admin) => {
						UserService.joinGroup(admin, groupHandle);
					});
					
					$scope.clearGroupForm();
		    	});
		}

		$scope.clearGroupForm = () => {
			$scope.addGroupFormData = null;
			$scope.clearMultipleFields();
		}

		GroupClassificationService.getAllGroupClassifications();
		$scope.groupClassifications = GroupClassificationService.getGroupClassificationList();
		
	}

})();