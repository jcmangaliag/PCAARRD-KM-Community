'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('posts').controller('AddPostController', AddPostController);

	AddPostController.$inject = ['$scope', 'ngToast', '$q', '$stateParams', 'AddPostService', 'AddPostCategoriesService', 'GroupService', 'SharedUploadService', 'UserAuthenticationService', 'UserService'];

	function AddPostController($scope, ngToast, $q, $stateParams, AddPostService, AddPostCategoriesService, GroupService, SharedUploadService, UserAuthenticationService, UserService) {
		var submitPost = AddPostService.submitPost;

		$scope.submitPost = _lodash2.default.partial(submitPost);
		$scope.addPostFormData = {
			category: AddPostCategoriesService.getCurrentAddPostCategory().postCategory.category,
			showPublic: true
		};
		$scope.multipleFields = {
			authors: [''],
			urls: [{ url: '', urlTitle: '' }]
		};
		$scope.MIN_AUTHOR = 1;
		$scope.MAX_AUTHOR = 5;
		$scope.MIN_URL = 1;
		$scope.MAX_URL = 10;
		$scope.defaultDatetime = (0, _moment2.default)().format('MMMM D YYYY, h:mm A');

		$scope.loadAdditionalFormFields = function () {
			if ($scope.addPostFormData.category === "event") {
				$scope.addPostFormData.startDateTime = $scope.defaultDatetime;
				$scope.endDateTime = {
					enable: false,
					selected: $scope.defaultDatetime
				};
			}
			if ($scope.addPostFormData.category === "report") {
				$scope.addPostFormData.dateTime = $scope.defaultDatetime;
			}

			$scope.user = {};
			$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

			if ($scope.user.isLoggedIn) {
				UserAuthenticationService.getCurrentUser().then(function (result) {
					$scope.user.currentUser = result;
				});
			}
		};

		$scope.toggleEndDateTime = function () {
			$scope.endDateTime.enable = !$scope.endDateTime.enable;
		};

		$scope.addField = function (fieldArray, maxField) {
			if (fieldArray.length < maxField) {
				if (fieldArray === $scope.multipleFields.urls) {
					fieldArray.push({ url: '', urlTitle: '' });
				} else {
					fieldArray.push('');
				}
			}
		};

		$scope.removeField = function (fieldArray, minField) {
			if (fieldArray.length > minField) {
				fieldArray.pop();
			}
		};

		$scope.clearMultipleFields = function () {
			_lodash2.default.forOwn($scope.multipleFields, function (fieldArray) {
				fieldArray.length = 0;
				if (fieldArray === $scope.multipleFields.urls) {
					fieldArray.push({ url: '', urlTitle: '' });
				} else {
					fieldArray.push('');
				}
			});
		};

		$scope.removeFiles = function () {
			$scope.addPostFormData.files = [];
		};

		$scope.clearForm = function () {
			var category = $scope.addPostFormData.category;
			$scope.addPostFormData = null;
			$scope.clearUploadFiles();
			$scope.clearHashtags();
			$scope.clearTechnologyHandles();
			$scope.technologyHandle.enable = false;
			$scope.clearMultipleFields();

			if (category === 'event') {
				$scope.addPostFormData = {
					startDateTime: $scope.defaultDatetime
				};
				//delete $scope.addPostFormData.endDateTime;
				$scope.endDateTime.enable = false;
			}

			if (category === 'report') {
				$scope.addPostFormData = { dateTime: $scope.defaultDatetime };
			}

			if (category === 'advertisement') {
				$scope.price = null;
			}

			$scope.addPostFormData = { category: category, showPublic: true };
		};

		$scope.onProcessPostData = function (postCategory) {

			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			if (postCategory === 'advertisement' && $scope.price) {
				$scope.addPostFormData.price = $scope.price.toFixed(2);
			}

			if (postCategory === 'event' && $scope.endDateTime.enable) {
				$scope.addPostFormData.endDateTime = $scope.endDateTime.selected;
			}

			if (postCategory === 'news') {
				$scope.addPostFormData.authors = $scope.multipleFields.authors;
			}

			if (postCategory === 'media' && $scope.addPostFormData.mediaType === 'files' && $scope.selectedUploadFiles.length < 1) {
				ngToast.create({
					className: 'danger',
					content: 'No file selected. Please select files.'
				});
				return;
			}

			$scope.addPostFormData.category = postCategory;
			if ($scope.technologyHandle.enable) {
				$scope.addPostFormData.technologyHandles = $scope.selectedTechnologies;
			}
			$scope.addPostFormData.hashtags = $scope.hashtags;
			$scope.addPostFormData.datePosted = (0, _moment2.default)().format('MMMM Do YYYY, h:mm:ss a');
			$scope.addPostFormData.reactions = [{
				name: "comments",
				count: 0,
				users: []
			}, {
				name: "thumbsUp",
				count: 0,
				users: []
			}, {
				name: "happy",
				count: 0,
				users: []
			}, {
				name: "sad",
				count: 0,
				users: []
			}];

			if ($scope.user.isLoggedIn) {
				$scope.addPostFormData.postedBy = {
					_id: $scope.user.currentUser._id,
					name: $scope.user.currentUser.name.first + ' ' + $scope.user.currentUser.name.last
				};
			}
			$scope.addPostFormData.groupBelonged = $stateParams.handle;

			if (postCategory === 'media' && $scope.addPostFormData.mediaType === 'url') {
				$scope.addPostFormData.urls = $scope.multipleFields.urls;
			} else if ($scope.selectedUploadFiles.length > 0) {
				var uploadedFiles = [];
				$scope.progressBarON = true;
				SharedUploadService.uploadFiles($scope.selectedUploadFiles, uploadedFiles).then(function (result) {
					$scope.progressBarON = false;
					$scope.addPostFormData.files = uploadedFiles;
					return $scope.submitPost($scope.addPostFormData);
				}, function (error) {
					$scope.progressBarON = false;
					ngToast.create({
						className: 'danger',
						content: 'Error: ' + error.data.message
					});

					return $q.reject(error);
				}).then(function () {
					$scope.onSetGroupPosts(postCategory);
					$scope.clearForm();
				});

				return;
			}

			$scope.submitPost($scope.addPostFormData).then(function () {
				$scope.onSetGroupPosts(postCategory);
				$scope.clearForm();
			});
		};

		$scope.onSetGroupPosts = function (postCategory) {
			GroupService.getOneGroup($scope.selectedGroup.handle).then(function (refreshedGroup) {
				refreshedGroup.postsCount.total++;
				refreshedGroup.postsCount[postCategory]++;
				GroupService.updateGroup(refreshedGroup.handle, { postsCount: refreshedGroup.postsCount });
				$scope.selectedGroup.postsCount = refreshedGroup.postsCount;
				$scope.updatePostsAnalysis();
			}, function (error) {
				// show 404 not found page
			});
		};

		$scope.loadAdditionalFormFields();
	}
})();