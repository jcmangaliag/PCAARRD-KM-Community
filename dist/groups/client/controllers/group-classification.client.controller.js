'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('groups').controller('GroupClassificationController', GroupClassificationController);

	GroupClassificationController.$inject = ['$scope', '$state', 'GroupClassificationService', 'GroupService', 'SharedPaginationService', '$filter', 'ngToast', 'UserAuthenticationService'];

	function GroupClassificationController($scope, $state, GroupClassificationService, GroupService, SharedPaginationService, $filter, ngToast, UserAuthenticationService) {

		$scope.addGroupClassificationFormData = {};

		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.classificationsPerPage = 10;

		$scope.editedGroupClassificationFormData = null;
		$scope.sortGroupClassificationBy = ['industry', 'sector', 'isp', 'specificCommodity'];
		$scope.sortReverse = false;

		$scope.changeSort = function (groupClassificationFields) {
			$scope.sortReverse = _lodash2.default.isEqual($scope.sortGroupClassificationBy, groupClassificationFields) ? !$scope.sortReverse : false;
			$scope.sortGroupClassificationBy = groupClassificationFields;
		};

		$scope.clearGroupClassificationForm = function () {
			$scope.addGroupClassificationFormData = null;
		};

		$scope.validateExistingGroupClassification = function (formData) {
			GroupClassificationService.getAllGroupClassifications();

			return $scope.groupClassifications.contents.map(function (item) {
				return (item.specificCommodity || item.isp).toLowerCase();
			}).indexOf((formData.specificCommodity || formData.isp).toLowerCase());
		};

		$scope.getExistingGroupClassification = function (existingGroupClassificationIndex) {
			GroupClassificationService.getAllGroupClassifications();

			return $scope.groupClassifications.contents[existingGroupClassificationIndex];
		};

		$scope.onProcessGroupClassificationForm = function () {
			var existingGroupClassification = $scope.validateExistingGroupClassification($scope.addGroupClassificationFormData);

			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			if (existingGroupClassification < 0) {
				// the specific commodity or isp does not exist
				$scope.addGroupClassificationFormData.isUsed = false;

				if (!$scope.addGroupClassificationFormData.specificCommodity) $scope.addGroupClassificationFormData.specificCommodity = null;

				GroupClassificationService.submitGroupClassification($scope.addGroupClassificationFormData).then(function () {
					$scope.clearGroupClassificationForm();
				});
			} else {
				ngToast.create({
					className: 'danger',
					content: 'Error: The Specific Commodity or ISP already exists!'
				});
			}
		};

		$scope.onEditGroupClassification = function (groupClassification) {
			$scope.editedGroupClassificationFormData = _lodash2.default.cloneDeep(groupClassification);
		};

		$scope.isEditingClassification = function (groupClassificationID) {
			return $scope.editedGroupClassificationFormData && $scope.editedGroupClassificationFormData._id === groupClassificationID;
		};

		$scope.onProcessEditedGroupClassification = function () {
			var existingGroupClassification = $scope.validateExistingGroupClassification($scope.editedGroupClassificationFormData);

			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			if (existingGroupClassification < 0 || $scope.getExistingGroupClassification(existingGroupClassification)._id === $scope.editedGroupClassificationFormData._id) {
				var updatedFields = {
					industry: $scope.editedGroupClassificationFormData.industry,
					sector: $scope.editedGroupClassificationFormData.sector,
					isp: $scope.editedGroupClassificationFormData.isp
				};

				updatedFields.specificCommodity = $scope.editedGroupClassificationFormData.specificCommodity || null;

				GroupClassificationService.updateGroupClassification($scope.editedGroupClassificationFormData._id, updatedFields).then(function () {
					$scope.editedGroupClassificationFormData = null;

					ngToast.create({
						className: 'success',
						content: 'The Group Classification was successfully updated.'
					});

					$scope.searchClassificationsValue = "";
				});
			} else {
				ngToast.create({
					className: 'danger',
					content: 'Error: The Specific Commodity or ISP already exists!'
				});
			}
		};

		$scope.cancelEditGroupClassification = function () {
			$scope.editedGroupClassificationFormData = null;
		};

		$scope.onDeleteOneGroupClassification = function (groupClassification) {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			GroupClassificationService.deleteOneGroupClassification(groupClassification);
		};

		$scope.goToGroup = function (groupClassificationID) {
			var groupIndex = $scope.groups.contents.map(function (group) {
				return group.classification._id;
			}).indexOf(groupClassificationID);
			$state.go('oneGroup', { handle: $scope.groups.contents[groupIndex].handle });
		};

		$scope.$watch('searchClassificationsValue', function (value) {
			if ($scope.groupClassifications) {
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