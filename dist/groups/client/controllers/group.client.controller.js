'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('groups').controller('GroupController', GroupController);

	GroupController.$inject = ['$scope', '$state', '$q', '$timeout', 'ngToast', '$stateParams', 'GroupClassificationService', 'ViewGroupsCategoriesService', 'GroupService', 'SharedPaginationService', 'UserAuthenticationService', 'UserService', '$filter', 'CommentService'];

	function GroupController($scope, $state, $q, $timeout, ngToast, $stateParams, GroupClassificationService, ViewGroupsCategoriesService, GroupService, SharedPaginationService, UserAuthenticationService, UserService, $filter, CommentService) {

		/* for View One Group */

		$scope.fullGroupDescription = false;
		$scope.readGroupDescription = "Read More";
		$scope.DESCRIPTION_LIMIT = 1000;
		$scope.descriptionSize = $scope.DESCRIPTION_LIMIT;

		$scope.toggleGroupDescription = function () {
			$scope.fullGroupDescription = !$scope.fullGroupDescription;
			$scope.readGroupDescription = $scope.readGroupDescription == "Read Less" ? "Read More" : "Read Less";
			$scope.descriptionSize = $scope.descriptionSize === $scope.DESCRIPTION_LIMIT ? undefined : $scope.DESCRIPTION_LIMIT;
		};

		$scope.loadPostsAnalysis = function () {
			$scope.postsAnalysisChart = Highcharts.chart('group-posts-distribution-container', {
				chart: {
					type: 'bar'
				},
				title: {
					text: 'No Group'
				},
				subtitle: {
					text: 'PCAARRD KM Community'
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
		};

		$scope.updatePostsAnalysis = function () {
			$scope.postsAnalysisChart.setTitle({ text: $scope.selectedGroup.name + ' Posts' }, { text: 'Source: PCAARRD KM Community' });
			$scope.postsAnalysisChart.series[0].setData([$scope.selectedGroup.postsCount.total, $scope.selectedGroup.postsCount.question, $scope.selectedGroup.postsCount.report, $scope.selectedGroup.postsCount.media, $scope.selectedGroup.postsCount.news, $scope.selectedGroup.postsCount.event, $scope.selectedGroup.postsCount.advertisement, $scope.selectedGroup.postsCount.others], true);
		};

		$scope.loadGroupAdmins = function (groupAdminsID) {
			// load all info of group admins
			UserService.getAllGroupAdminstrators(groupAdminsID).then(function (admins) {
				$scope.groupAdmins = admins;
			});
		};

		$scope.loadGroupMembers = function (groupHandle) {
			// load all info of group members
			UserService.getAllUsersByGroup(groupHandle).then(function (members) {
				$scope.groupMembers = members;
			});
		};

		$scope.loadGroupPendingMembers = function (groupPendingMembersID) {
			// load all info of pending group members
			UserService.getAllGroupPendingMembers(groupPendingMembersID).then(function (pendingMembers) {
				$scope.groupPendingMembers = pendingMembers;
			});
		};

		$scope.loadGroupCommentsCount = function (groupHandle) {
			CommentService.getCommentsLengthByGroupBelonged(groupHandle).then(function (commentsCount) {
				$scope.groupCommentsCount = commentsCount;
			});
		};

		$scope.joinThisGroup = function (userID, groupHandle) {
			UserService.joinGroup(userID, groupHandle).then(function () {
				return GroupService.updateGroup($scope.selectedGroup.handle, { membersCount: ++$scope.selectedGroup.membersCount });
			}, function () {
				ngToast.create({
					className: 'danger',
					content: 'Failed to join the group.'
				});
			}).then(function () {
				ngToast.create({
					className: 'success',
					content: 'Group was successfully joined.'
				});

				return UserService.getOneUser(userID);
			}).then(function (user) {
				if (user._id == $scope.user.currentUser._id) {
					$scope.user.currentUser.groupsJoined.push($scope.selectedGroup.handle);
				}
				$scope.groupMembers.push(user);
				$scope.userMembership = true;
			});
		};

		$scope.onJoinThisGroup = function (userID, groupHandle) {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			if ($scope.selectedGroup.membership === "No Approval") {
				$scope.joinThisGroup(userID, groupHandle);
			} else {
				$scope.addToPendingList(userID, groupHandle);
			}
		};

		$scope.addToPendingList = function (userID, groupHandle) {
			GroupService.addToGroupPendingMembersList(userID, groupHandle).then(function () {
				ngToast.create({
					className: 'success',
					content: 'Group Join Request was successfully sent.'
				});

				$scope.groupPendingMembers.push(userID);
				$scope.selectedGroup.pendingMembers.push(userID);
			}, function () {
				ngToast.create({
					className: 'danger',
					content: 'Failed to send group join request.'
				});
			});
		};

		$scope.removeFromPendingList = function (userID, groupHandle) {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			GroupService.removeFromGroupPendingMembersList(userID, groupHandle).then(function () {
				ngToast.create({
					className: 'success',
					content: 'Group Join Request was successfully removed.'
				});

				var groupIndexInSelectedGroup = $scope.selectedGroup.pendingMembers.indexOf(userID);
				if (groupIndexInSelectedGroup > -1) {
					$scope.selectedGroup.pendingMembers.splice(groupIndexInSelectedGroup, 1);
				}
				var groupIndexInGroup = $scope.groupPendingMembers.map(function (user) {
					return user._id;
				}).indexOf(userID);
				if (groupIndexInGroup > -1) {
					$scope.groupPendingMembers.splice(groupIndexInGroup, 1);
				}
			}, function () {
				ngToast.create({
					className: 'danger',
					content: 'Failed to remove group join request.'
				});
			});
		};

		$scope.leaveThisGroup = function (userID, groupHandle) {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			if ($scope.selectedGroup.admin.indexOf(userID) > -1) {
				if ($scope.selectedGroup.admin.length > 1) {
					$scope.removeGroupAdmin(userID, groupHandle);
				} else {
					ngToast.create({
						className: 'warning',
						content: 'The group should have at least one Group Admin.'
					});

					return;
				}
			}

			UserService.leaveGroup(userID, groupHandle).then(function () {
				return GroupService.updateGroup($scope.selectedGroup.handle, { membersCount: --$scope.selectedGroup.membersCount });
			}, function () {
				ngToast.create({
					className: 'danger',
					content: 'Failed to leave the group.'
				});
			}).then(function () {
				ngToast.create({
					className: 'success',
					content: 'Group was successfully left.'
				});

				var groupIndexInUser = $scope.user.currentUser.groupsJoined.indexOf($scope.selectedGroup.handle);
				var groupIndexInGroup = $scope.groupMembers.map(function (user) {
					return user._id;
				}).indexOf(userID);
				if (groupIndexInUser > -1) {
					$scope.user.currentUser.groupsJoined.splice(groupIndexInUser, 1);
				}
				if (groupIndexInGroup > -1) {
					$scope.groupMembers.splice(groupIndexInGroup, 1);
				}

				$scope.userMembership = false;
			});
		};

		$scope.acceptPendingMember = function (pendingMemberID, groupHandle) {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			$scope.removeFromPendingList(pendingMemberID, groupHandle);
			$scope.joinThisGroup(pendingMemberID, groupHandle);
		};

		$scope.rejectPendingMember = function (pendingMemberID, groupHandle) {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			$scope.removeFromPendingList(pendingMemberID, groupHandle);
		};

		$scope.removeGroupAdmin = function (userID, groupHandle) {
			GroupService.removeAdmin(userID, groupHandle).then(function () {
				ngToast.create({
					className: 'success',
					content: 'Group Admin was successfully removed.'
				});

				var groupIndexInSelectedGroup = $scope.selectedGroup.admin.indexOf(userID);
				if (groupIndexInSelectedGroup > -1) {
					$scope.selectedGroup.admin.splice(groupIndexInSelectedGroup, 1);
				}
				var groupIndexInGroup = $scope.groupAdmins.map(function (user) {
					return user._id;
				}).indexOf(userID);
				if (groupIndexInGroup > -1) {
					$scope.groupAdmins.splice(groupIndexInGroup, 1);
				}
			}, function () {
				ngToast.create({
					className: 'danger',
					content: 'Failed to remove Group Admin.'
				});
			});
		};

		$scope.removeMember = function (memberID, groupHandle) {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			if ($scope.selectedGroup.admin.indexOf(memberID) > -1) {
				if ($scope.selectedGroup.admin.length > 1) {
					$scope.removeGroupAdmin(memberID, groupHandle);
				} else {
					ngToast.create({
						className: 'warning',
						content: 'The group should have at least one Group Admin.'
					});

					return;
				}
			}

			UserService.leaveGroup(memberID, groupHandle).then(function () {
				return GroupService.updateGroup($scope.selectedGroup.handle, { membersCount: --$scope.selectedGroup.membersCount });
			}, function () {
				ngToast.create({
					className: 'danger',
					content: 'Failed to remove group member.'
				});
			}).then(function () {
				ngToast.create({
					className: 'success',
					content: 'Group member was successfully removed.'
				});

				if (memberID === $scope.user.currentUser._id) {
					var groupIndexInUser = $scope.user.currentUser.groupsJoined.indexOf($scope.selectedGroup.handle);
					if (groupIndexInUser > -1) {
						$scope.user.currentUser.groupsJoined.splice(groupIndexInUser, 1);
						$scope.userMembership = false;
					}
				}

				var groupIndexInGroup = $scope.groupMembers.map(function (user) {
					return user._id;
				}).indexOf(memberID);

				if (groupIndexInGroup > -1) {
					$scope.groupMembers.splice(groupIndexInGroup, 1);
				}
			});
		};

		$scope.onRemoveAdmin = function (adminID, groupHandle) {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			if ($scope.selectedGroup.admin.length > 1) {
				$scope.removeGroupAdmin(adminID, groupHandle);
			} else {
				ngToast.create({
					className: 'warning',
					content: 'The group should have at least one Group Admin.'
				});

				return;
			}
		};

		/* for View One and View All Groups */

		$scope.setGroupsData = function () {
			var currentViewGroupsCategory = ViewGroupsCategoriesService.getCurrentViewGroupsCategory().category;
			ViewGroupsCategoriesService.retrieveGroupsByCategory(currentViewGroupsCategory);
			$scope.groups = GroupService.getGroupList();
			$scope.groupsCopy = GroupService.getGroupListCopy();

			$scope.paginate = _lodash2.default.cloneDeep(SharedPaginationService);
			$scope.paginate.currentPage = 1;
			$scope.paginate.groupsPerPage = 10;
		};

		$scope.getGroupData = function () {
			$scope.user = {};
			$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

			if ($stateParams.handle) {
				// if viewing one group

				GroupService.getOneGroup($stateParams.handle) // load the group
				.then(function (result) {
					$scope.selectedGroup = result;
					$scope.loadGroupAdmins($scope.selectedGroup.admin);
					$scope.loadGroupMembers($scope.selectedGroup.handle);
					$scope.loadGroupPendingMembers($scope.selectedGroup.pendingMembers);
					$scope.loadGroupCommentsCount($scope.selectedGroup.handle);

					$timeout(function () {
						$scope.loadPostsAnalysis();
						$scope.updatePostsAnalysis();
					}, 1000);

					return UserAuthenticationService.getCurrentUser();
				}, function (error) {
					// show 404 not found page
				}).then(function (currentUser) {
					// load the current user
					$scope.user.currentUser = currentUser;
					if ($scope.user.currentUser) {
						$scope.userMembership = $scope.user.currentUser.groupsJoined.indexOf($scope.selectedGroup.handle) > -1 ? true : false;
					}
				});
			} else if ($state.$current.name === "groups") {
				ViewGroupsCategoriesService.setUserID(null);
				if ($scope.user.isLoggedIn) {
					UserAuthenticationService.getCurrentUser().then(function (result) {
						ViewGroupsCategoriesService.setUserID(result._id);
						$scope.setGroupsData();
					});
				} else {
					// for those not logged in
					ViewGroupsCategoriesService.setUserID("none");
					$scope.setGroupsData();
				}
			}
		};

		$scope.$watch('searchGroupsValue', function (value) {
			if ($scope.groups) {
				$scope.groups.contents = $filter('filter')($scope.groupsCopy.contents, value);
				$scope.paginate.currentPage = 1;
			}
		});

		$scope.resetSearchGroup = function () {
			$scope.searchGroupsValue = "";
		};

		$scope.resetGroupsCurrentPage = function () {
			$scope.paginate.currentPage = 1;
		};

		$scope.getGroupData();

		/* for Create Group */

		if ($state.$current.name === "createGroup") {
			UserService.getAllUsers();
			$scope.users = UserService.getUserList();
		}

		$scope.addGroupFormData = { classification: "" };

		$scope.multipleFields = {
			admins: ['']
		};

		$scope.MIN_ADMIN = 1;

		$scope.addField = function (fieldArray) {
			fieldArray.push('');
		};

		$scope.removeField = function (fieldArray, minField) {
			if (fieldArray.length > minField) {
				fieldArray.pop();
			}
		};

		$scope.clearMultipleFields = function () {
			_lodash2.default.forOwn($scope.multipleFields, function (fieldArray) {
				fieldArray.length = 0;
				fieldArray.push('');
			});
		};

		$scope.generateGroupNameAndHandle = function (classification) {
			$scope.addGroupFormData.name = classification && (classification.specificCommodity || classification.isp) || "";
			$scope.addGroupFormData.handle = $scope.addGroupFormData.name.replace(/\s/g, "").toLowerCase();
		};

		$scope.validateAdminEmailAddress = function (adminEmails) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = adminEmails[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var adminEmail = _step.value;

					if ($scope.users.contents.map(function (user) {
						return user.email;
					}).indexOf(adminEmail) < 0) {
						return adminEmail;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return true;
		};

		$scope.convertEmailToUserID = function (adminEmails) {
			var userList = $scope.users.contents;
			return adminEmails.map(function (adminEmail) {
				return userList[userList.map(function (user) {
					return user.email;
				}).indexOf(adminEmail)]._id;
			});
		};

		$scope.onProcessGroupData = function () {
			var classificationID = $scope.addGroupFormData.classification._id;
			var groupHandle = $scope.addGroupFormData.handle;

			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			UserAuthenticationService.getCurrentUser().then(function (result) {
				$scope.addGroupFormData.createdBy = result._id;

				var validatedEmails = $scope.validateAdminEmailAddress($scope.multipleFields.admins);
				if (validatedEmails !== true) {
					ngToast.create({
						className: 'warning',
						content: 'User ' + validatedEmails + ' does not exist!'
					});

					return $q.reject('User ' + validatedEmails + ' does not exist!');
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
				$scope.addGroupFormData.dateCreated = (0, _moment2.default)().format('MMMM Do YYYY, h:mm:ss a');
				$scope.addGroupFormData.photo = null;
				$scope.addGroupFormData.coverPhoto = null;
				delete $scope.addGroupFormData.classification.isUsed;
				delete $scope.addGroupFormData.classification.__v;

				return GroupService.submitGroup($scope.addGroupFormData);
			}).then(function () {
				GroupClassificationService.updateGroupClassification(classificationID, { isUsed: true });

				_lodash2.default.forEach($scope.addGroupFormData.admin, function (admin) {
					UserService.joinGroup(admin, groupHandle);
				});

				$scope.clearGroupForm();
			});
		};

		$scope.clearGroupForm = function () {
			$scope.addGroupFormData = null;
			$scope.clearMultipleFields();
		};

		GroupClassificationService.getAllGroupClassifications();
		$scope.groupClassifications = GroupClassificationService.getGroupClassificationList();
	}
})();