import moment from 'moment';
import _ from 'lodash/lodash.min';

(() => {
	'use strict';

	angular
		.module('groups')
		.controller('GroupController', GroupController);

	GroupController.$inject = ['$scope', '$state', '$q', '$timeout', 'ngToast', '$stateParams', 'GroupClassificationService', 'ViewGroupsCategoriesService', 'GroupService', 'SharedPaginationService', 'UserAuthenticationService', 'UserService', '$filter', 'CommentService'];

	function GroupController ($scope, $state, $q, $timeout, ngToast, $stateParams, GroupClassificationService, ViewGroupsCategoriesService, GroupService, SharedPaginationService, UserAuthenticationService, UserService, $filter, CommentService) {

		$scope.user = {
			logout: UserAuthenticationService.logout
		}

		$scope.$watch(() => {	// watches current logged in user
		    return UserAuthenticationService.getCurrentUserID();
		}, (userID) => {
			$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();
			if ($scope.user.isLoggedIn){
				$scope.eResourcesAccess = "downloads";	// e-resources link changes if logged in
				if ($scope.user.currentUser && userID && $scope.user.currentUser._id != userID){
					// if the page is not updated with the current user, it will reload to update
					$window.location.reload();
				}

				UserAuthenticationService.getCurrentUser()
			    	.then((result)=> {
			    		$scope.user.currentUser = result;	// gets all information about current user
			    	});
			} else {
				$scope.user.currentUser = null;
				$scope.eResourcesAccess = "";
			}
		});
		
		/* for View One Group */

		$scope.fullGroupDescription = false;	// show full description if group's description is too long
		$scope.readGroupDescription = "Read More";
		$scope.DESCRIPTION_LIMIT = 1000;	// shows default of 1000 characters in group's description
		$scope.descriptionSize = $scope.DESCRIPTION_LIMIT;

		$scope.toggleGroupDescription = () => {	// toggles Read More or Read Less in very long group's description
			$scope.fullGroupDescription = !$scope.fullGroupDescription;
			$scope.readGroupDescription = $scope.readGroupDescription == "Read Less"? "Read More" : "Read Less";
			$scope.descriptionSize = $scope.descriptionSize === $scope.DESCRIPTION_LIMIT? undefined : $scope.DESCRIPTION_LIMIT;
		}

		$scope.loadPostsAnalysis = () => {	// post analysis bar chart
			$scope.postsAnalysisChart = Highcharts.chart('group-posts-distribution-container', {
			    chart: {
			        type: 'bar'
			    },
			    title: {
			        text: `No Group`
			    },
			    subtitle: {
			        text: `PCAARRD KM Community`
			    },
			    xAxis: {
			        categories: ['Total', 'Question', 'Incident Report', 'Media or URL', 'News', 'Event', 'Advertisement', 'Others'],
			        title: {
			            text: null
			        }
			    },
			    yAxis: {
			        min: 0,
			        title: {
			            text: 'Number of Posts',
			            align: 'high'
			        },
			        labels: {
			            overflow: 'justify'
			        },
			        allowDecimals: false
			    },
			    plotOptions: {
			        bar: {
			            dataLabels: {
			                enabled: true
			            }
			        }
			    },
			    legend: {
			        enabled: false
			    },
			    credits: {
			        enabled: false
			    },
			    series: [{
			        name: 'Number of Posts',
			        data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
			    }]
			});
		}

		$scope.updatePostsAnalysis = () => {	// modify post analysis chart
			$scope.postsAnalysisChart.setTitle({text: `${$scope.selectedGroup.name} Posts`}, {text: 'Source: PCAARRD KM Community'});
			$scope.postsAnalysisChart.series[0].setData([
				$scope.selectedGroup.postsCount.total,
				$scope.selectedGroup.postsCount.question,
				$scope.selectedGroup.postsCount.report,
				$scope.selectedGroup.postsCount.media,
				$scope.selectedGroup.postsCount.news,
				$scope.selectedGroup.postsCount.event,
				$scope.selectedGroup.postsCount.advertisement,
				$scope.selectedGroup.postsCount.others
			], true);
		}

		$scope.loadGroupAdmins = (groupAdminsID) => {	// load all info of group admins
			UserService.getAllGroupAdminstrators(groupAdminsID)
				.then((admins) => {
					$scope.groupAdmins = admins;
				});
		}

		$scope.loadGroupMembers = (groupHandle) => {	// load all info of group members
			UserService.getAllUsersByGroup(groupHandle)
				.then((members) => {
					$scope.groupMembers = members;
				});
		}

		$scope.loadGroupPendingMembers = (groupPendingMembersID) => {	// load all info of pending group members
			UserService.getAllGroupPendingMembers(groupPendingMembersID)
				.then((pendingMembers) => {
					$scope.groupPendingMembers = pendingMembers;
				});
		}

		$scope.loadGroupCommentsCount = (groupHandle) => {	// count the number of comments in the group
			CommentService.getCommentsLengthByGroupBelonged(groupHandle)
				.then((commentsCount) => {
					$scope.groupCommentsCount = commentsCount;
				});
		}

		$scope.joinThisGroup = (userID, groupHandle) => {
			UserService.joinGroup(userID, groupHandle)	// adding the group to user's groupsJoined
				.then(() => {	// increase group's membersCount
					return GroupService.updateGroup($scope.selectedGroup.handle, {membersCount: ++$scope.selectedGroup.membersCount});
				}, () => {
					ngToast.create({
			    		className: 'danger',
			    		content: `Failed to join the group.`
			    	});
				})
				.then(()=> {
					ngToast.create({
			    		className: 'success',
			    		content: `Group was successfully joined.`
			    	});

					return UserService.getOneUser(userID)
				})
				.then((user) => {	// update the group members UI
					if (user._id == $scope.user.currentUser._id){
						$scope.user.currentUser.groupsJoined.push($scope.selectedGroup.handle);
					}
					$scope.groupMembers.push(user);
					$scope.userMembership = true;
				});

		}

		$scope.onJoinThisGroup = (user, groupHandle) => {	// processing before joining the group
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			if ($scope.selectedGroup.membership === "No Approval") {
				$scope.joinThisGroup(user._id, groupHandle);
			} else {	// with Group Admin Approval
				$scope.addToPendingList(user, groupHandle);
			}
		}

		$scope.addToPendingList = (user, groupHandle) => {
			GroupService.addToGroupPendingMembersList(user._id, groupHandle)	// adding the user to group's pending members
				.then(() => {
					ngToast.create({
			    		className: 'success',
			    		content: `Group Join Request was successfully sent.`
			    	});
					// to update the Group Pending Members UI
					$scope.groupPendingMembers.push(user);
					$scope.selectedGroup.pendingMembers.push(user._id);
				}, () => {
					ngToast.create({
			    		className: 'danger',
			    		content: `Failed to send group join request.`
			    	});
				});
		}

		$scope.removeFromPendingList = (userID, groupHandle) => {
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			GroupService.removeFromGroupPendingMembersList(userID, groupHandle)	// removing the user to group's pending members
				.then(() => {
					ngToast.create({
			    		className: 'success',
			    		content: `Group Join Request was successfully removed.`
			    	});
					// to update the Group Pending Members UI
					const groupIndexInSelectedGroup = $scope.selectedGroup.pendingMembers.indexOf(userID);
					if (groupIndexInSelectedGroup > -1){
						$scope.selectedGroup.pendingMembers.splice(groupIndexInSelectedGroup, 1);
					}
			    	const groupIndexInGroup = $scope.groupPendingMembers.map((user) => user._id).indexOf(userID);
					if (groupIndexInGroup > -1){
						$scope.groupPendingMembers.splice(groupIndexInGroup, 1);
					}
				}, () => {
					ngToast.create({
			    		className: 'danger',
			    		content: `Failed to remove group join request.`
			    	});
				});
		}

		$scope.leaveThisGroup = (userID, groupHandle) => {
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			if ($scope.selectedGroup.admin.indexOf(userID) > -1){	// if group admin, also remove as group admin
				if ($scope.selectedGroup.admin.length > 1){
					$scope.removeGroupAdmin(userID, groupHandle);
				} else {
					ngToast.create({
			    		className: 'warning',
			    		content: `The group should have at least one Group Admin.`
			    	});

					return;
				}
			}

			UserService.leaveGroup(userID, groupHandle)	// removing the group to user's groupsJoined
				.then(() => {	  // decrease group's membersCount
					return GroupService.updateGroup($scope.selectedGroup.handle, {membersCount: --$scope.selectedGroup.membersCount});
				}, () => {
					ngToast.create({
			    		className: 'danger',
			    		content: `Failed to leave the group.`
			    	});
				})
				.then(()=> {
					ngToast.create({
			    		className: 'success',
			    		content: `Group was successfully left.`
			    	});
					// to update Group Members UI
					const groupIndexInUser = $scope.user.currentUser.groupsJoined.indexOf($scope.selectedGroup.handle);
			    	const groupIndexInGroup = $scope.groupMembers.map((user) => user._id).indexOf(userID);
					if (groupIndexInUser > -1){
						$scope.user.currentUser.groupsJoined.splice(groupIndexInUser, 1);
					}
					if (groupIndexInGroup > -1){
						$scope.groupMembers.splice(groupIndexInGroup, 1);
					}

					$scope.userMembership = false;	// used in post controller to determine the appropriate posts to display
				});

		}

		$scope.acceptPendingMember = (pendingMemberID, groupHandle) => {	// pending group member becomes group member
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			$scope.removeFromPendingList(pendingMemberID, groupHandle);
			$scope.joinThisGroup(pendingMemberID, groupHandle);
		}

		$scope.rejectPendingMember = (pendingMemberID, groupHandle) => {	// pending group member does not become group member
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			$scope.removeFromPendingList(pendingMemberID, groupHandle);
		}

		$scope.removeGroupAdmin = (userID, groupHandle) => {
			GroupService.removeAdmin(userID, groupHandle)	// user is removed in group's admin list
				.then(() => {
					ngToast.create({
			    		className: 'success',
			    		content: `Group Admin was successfully removed.`
			    	});
					// to update Group Admins UI
					const groupIndexInSelectedGroup = $scope.selectedGroup.admin.indexOf(userID);
					if (groupIndexInSelectedGroup > -1){
						$scope.selectedGroup.admin.splice(groupIndexInSelectedGroup, 1);
					}
			    	const groupIndexInGroup = $scope.groupAdmins.map((user) => user._id).indexOf(userID);
					if (groupIndexInGroup > -1){
						$scope.groupAdmins.splice(groupIndexInGroup, 1);
					}
				}, () => {
					ngToast.create({
			    		className: 'danger',
			    		content: `Failed to remove Group Admin.`
			    	});
				});
		}

		$scope.removeMember = (memberID, groupHandle) => {
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			if ($scope.selectedGroup.admin.indexOf(memberID) > -1){	// also removing as group admin if possible
				if ($scope.selectedGroup.admin.length > 1){
					$scope.removeGroupAdmin(memberID, groupHandle);
				} else {
					ngToast.create({
			    		className: 'warning',
			    		content: `The group should have at least one Group Admin.`
			    	});

					return;
				}
			}

			UserService.leaveGroup(memberID, groupHandle)	// removing the group from user's groupsJoined
				.then(() => {	// decrements the group members
					return GroupService.updateGroup($scope.selectedGroup.handle, {membersCount: --$scope.selectedGroup.membersCount});
				}, () => {
					ngToast.create({
			    		className: 'danger',
			    		content: `Failed to remove group member.`
			    	});
				})
				.then(()=> {
					ngToast.create({
			    		className: 'success',
			    		content: `Group member was successfully removed.`
			    	});
					//	to update the Group UI when current logged in user left the group
					if (memberID === $scope.user.currentUser._id){
						const groupIndexInUser = $scope.user.currentUser.groupsJoined.indexOf($scope.selectedGroup.handle);
				    	if (groupIndexInUser > -1){
							$scope.user.currentUser.groupsJoined.splice(groupIndexInUser, 1);
							$scope.userMembership = false;
						}
					}

			    	const groupIndexInGroup = $scope.groupMembers.map((user) => user._id).indexOf(memberID);

					if (groupIndexInGroup > -1){
						$scope.groupMembers.splice(groupIndexInGroup, 1);
					}
				});
		}

		$scope.onRemoveAdmin = (adminID, groupHandle) => {
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			if ($scope.selectedGroup.admin.length > 1){	// only allows removing group admin if it's more than one
				$scope.removeGroupAdmin(adminID, groupHandle);
			} else {
				ngToast.create({
		    		className: 'warning',
		    		content: `The group should have at least one Group Admin.`
		    	});

				return;
			}
		}




		/* for View One and View All Groups */

		$scope.setGroupsData = () => {	// used to view All Groups, My Groups, Discover Groups
			const currentViewGroupsCategory = ViewGroupsCategoriesService.getCurrentViewGroupsCategory().category;
			ViewGroupsCategoriesService.retrieveGroupsByCategory(currentViewGroupsCategory);
			$scope.groups = GroupService.getGroupList();
			$scope.groupsCopy = GroupService.getGroupListCopy();

			$scope.paginate = _.cloneDeep(SharedPaginationService);
			$scope.paginate.currentPage = 1;
			$scope.paginate.groupsPerPage = 10;
		}

		$scope.getGroupData = () => {
			$scope.user = {};
			$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

			if ($stateParams.handle) {	// if viewing one group

				GroupService.getOneGroup($stateParams.handle)	// load the group
					.then((result) => {
						$scope.selectedGroup = result;
						$scope.loadGroupAdmins($scope.selectedGroup.admin);
						$scope.loadGroupMembers($scope.selectedGroup.handle);
						$scope.loadGroupPendingMembers($scope.selectedGroup.pendingMembers);
						$scope.loadGroupCommentsCount($scope.selectedGroup.handle);

						$timeout(() => {
							$scope.loadPostsAnalysis();
							$scope.updatePostsAnalysis();
						}, 1000);

						return UserAuthenticationService.getCurrentUser();
					}, (error) => {
						// show 404 not found page
					})
					.then((currentUser)=> {	// load the current user
			    		$scope.user.currentUser = currentUser;
			    		if ($scope.user.currentUser){
			    			$scope.userMembership = $scope.user.currentUser.groupsJoined.indexOf($scope.selectedGroup.handle) > -1? true: false;
			    		}
			    	});


			} else if ($state.$current.name === "groups") {	// viewing all groups
				ViewGroupsCategoriesService.setUserID(null);
		    	if ($scope.user.isLoggedIn){	// allows viewing all groups, my groups, discover groups if logged in
		    		UserAuthenticationService.getCurrentUser()
				    	.then((result)=> {
				    		ViewGroupsCategoriesService.setUserID(result._id);
				    		$scope.setGroupsData();
				    	});
		    	} else {	// for those not logged in, all groups is the only group category shown
		    		ViewGroupsCategoriesService.setUserID("none");
		    		$scope.setGroupsData();
		    	}
			}
		}

		$scope.$watch('searchGroupsValue', function(value){ // for filter groups
			if ($scope.groups){
				$scope.groups.contents = $filter('filter')($scope.groupsCopy.contents, value);
				$scope.paginate.currentPage = 1;
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

		if ($state.$current.name === "createGroup"){	// get all users info
			UserService.getAllUsers();
			$scope.users = UserService.getUserList();
		}

		$scope.addGroupFormData = { classification: "" };

		$scope.multipleFields = {	// multiple group admins
			admins: [''],
		};

		$scope.MIN_ADMIN = 1;

		$scope.addField = (fieldArray) => {	// pushes to multipleFields.admins list
			fieldArray.push('');
		}

		$scope.removeField = (fieldArray, minField) => {	// pops to multipleFields.admins list
			fieldArray.push('');
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

		$scope.createGroupOptions = (groupClassification) => {	// format the group classification in its options
			if (groupClassification.type === "Industry-based"){
				return groupClassification.industry + ' -> ' + groupClassification.sector +' -> '+ groupClassification.isp +' -> '+
					(groupClassification.specificCommodity || "(None)");
			} else {
				return groupClassification.organization + ' -> ' + (groupClassification.isps.length < 1? "(None)" : groupClassification.isps.join(', '));
			}
		}

		$scope.generateGroupNameAndHandle = (classification) => {	// generates group name and handle right after choosing group classification
			if (classification && classification.type === "Industry-based"){
				$scope.addGroupFormData.name = (classification && (classification.specificCommodity || classification.isp)) || "";
				$scope.addGroupFormData.handle = $scope.addGroupFormData.name.replace(/\s/g, "").toLowerCase();
			} else {
				$scope.addGroupFormData.name = (classification && classification.organization) || "";
				$scope.addGroupFormData.handle = $scope.addGroupFormData.name.replace(/\s/g, "").toLowerCase();
			}
		}

		$scope.validateAdminEmailAddress = (adminEmails) => {	// validate if email entered in group admins already exist in the app
			for (let adminEmail of adminEmails){
				if ($scope.users.contents.map((user) => user.email).indexOf(adminEmail) < 0){
					return adminEmail;
				}
			}

			return true;
		}

		$scope.convertEmailToUserID = (adminEmails) => {	// return the user ids of group admin emails
			const userList = $scope.users.contents;
			return adminEmails.map((adminEmail) => {
					return userList[userList.map((user) => user.email).indexOf(adminEmail)]._id;
				}
			);
		}

		$scope.onProcessGroupData = () => {	// procesing before creating the group
			const classificationID = $scope.addGroupFormData.classification._id;
			const groupHandle = $scope.addGroupFormData.handle;

			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			UserAuthenticationService.getCurrentUser()	// get the info of logged in user
				.then((result)=> {
		    		$scope.addGroupFormData.createdBy = result._id;

		    		const validatedEmails = $scope.validateAdminEmailAddress($scope.multipleFields.admins);
					if (validatedEmails !== true){
						ngToast.create({
				    		className: 'warning',
				    		content: `User ${validatedEmails} does not exist!`
				    	});

				    	return $q.reject(`User ${validatedEmails} does not exist!`);
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

					return GroupService.submitGroup($scope.addGroupFormData);	// create the group
		    	})
		    	.then(()=> {	// update user classification as used, update group admins groupsJoined with this group
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
