'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('comments').controller('CommentController', CommentController);

	CommentController.$inject = ['$scope', '$state', '$q', 'CommentService', 'PostService', 'SharedPaginationService', 'ngToast', 'SharedUploadService', 'UserAuthenticationService', 'UserService'];

	function CommentController($scope, $state, $q, CommentService, PostService, SharedPaginationService, ngToast, SharedUploadService, UserAuthenticationService, UserService) {
		$scope.addCommentFormData = {};
		var submitComment = CommentService.submitComment;

		$scope.submitComment = _lodash2.default.partial(submitComment);
		$scope.comments = CommentService.getCommentList();
		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.commentsPerPage = 5;

		$scope.user = {};
		$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

		if ($scope.user.isLoggedIn) {
			UserAuthenticationService.getCurrentUser().then(function (result) {
				$scope.user.currentUser = result;
			});
		}

		$scope.clearCommentForm = function () {
			$scope.addCommentFormData = null;
			$scope.clearUploadFiles();
			$scope.clearTechnologyHandles();
			$scope.technologyHandle.enable = false;
			$scope.clearUploadFiles();
			$scope.clearHashtags();
		};

		$scope.onProcessCommentData = function (postID) {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
				return;
			}

			$scope.addCommentFormData.referredPost = postID;
			$scope.addCommentFormData.groupBelonged = $scope.selectedGroup.handle;

			if ($scope.technologyHandle.enable) {
				$scope.addCommentFormData.technologyHandles = $scope.selectedTechnologies;
			}
			$scope.addCommentFormData.hashtags = $scope.hashtags;

			$scope.addCommentFormData.dateCommented = (0, _moment2.default)().format('MMMM Do YYYY, h:mm:ss a');
			$scope.addCommentFormData.reactions = [{
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
				$scope.addCommentFormData.commentedBy = {
					_id: $scope.user.currentUser._id,
					name: $scope.user.currentUser.name.first + ' ' + $scope.user.currentUser.name.last
				};
			}

			var commentedBy = $scope.addCommentFormData.commentedBy;

			if ($scope.selectedUploadFiles.length > 0) {
				var uploadedFiles = [];
				$scope.progressBarON = true;
				SharedUploadService.uploadFiles($scope.selectedUploadFiles, uploadedFiles).then(function (result) {
					$scope.progressBarON = false;
					$scope.addCommentFormData.files = uploadedFiles;

					$scope.submitComment(_lodash2.default.cloneDeep($scope.addCommentFormData));
					PostService.getOnePost($scope.selectedPost._id) // check post for update
					.then(function (result) {
						PostService.setPostReaction($scope, result, 0, commentedBy); // increment post's comment count
					}, function (error) {
						// show 404 not found page
					});

					$scope.clearCommentForm();
				}, function (error) {
					$scope.progressBarON = false;
					ngToast.create({
						className: 'danger',
						content: 'Error: ' + error.data.message
					});
				});
			} else {
				$scope.submitComment(_lodash2.default.cloneDeep($scope.addCommentFormData));
				PostService.getOnePost($scope.selectedPost._id) // check post for update
				.then(function (result) {
					PostService.setPostReaction($scope, result, 0, commentedBy); // increment post's comment count
				}, function (error) {
					// show 404 not found page
				});

				$scope.clearCommentForm();
			}
		};

		$scope.onSetCommentReaction = function (comment, selectedGroupHandle, reactionIndex) {
			if (UserAuthenticationService.isLoggedIn() && $scope.user.currentUser && $scope.user.currentUser.groupsJoined.indexOf(selectedGroupHandle) > -1) {
				CommentService.getOneComment(comment._id).then(function (result) {
					var user = {
						_id: $scope.user.currentUser._id,
						name: $scope.user.currentUser.name.first + ' ' + $scope.user.currentUser.name.last
					};

					CommentService.setCommentReaction(result, reactionIndex, user);
					comment.reactions = result.reactions;
				}, function (error) {
					// show 404 not found page
				});
			} else {
				ngToast.create({
					className: 'warning',
					content: 'You must join the group first before reacting.'
				});
			}
		};

		$scope.onDeleteComment = function (comment) {
			if (!UserAuthenticationService.isLoggedIn()) {
				UserAuthenticationService.loginFirst();
			} else {
				CommentService.deleteOneComment(comment).then(function (result) {
					return PostService.getOnePost($scope.selectedPost._id); // update selected post
				}, function (error) {
					return $q.reject(error);
					// comment to be deleted not found
				}).then(function (result) {
					$scope.selectedPost = result;
					// find all comments of the same author of the current post
					return CommentService.getCommentsByUser($state.params.postID, comment.commentedBy._id);
				}, function (error) {
					return $q.reject(error);
					// referred post not found, but not possible since comments are removed after post deletion
				}).then(function (results) {
					PostService.decrementCommentsCount($scope.selectedPost, comment, results.length, comment.commentedBy._id);
				}, function (error) {
					// all comments of the author are not found
					ngToast.create({
						className: 'danger',
						content: 'Error: The comment was not found.'
					});
				});
			}
		};

		CommentService.getComments($state.params.postID);

		$scope.highlightReaction = function (selectedReaction) {
			return $scope.user.currentUser && selectedReaction.users.map(function (user) {
				return user._id;
			}).indexOf($scope.user.currentUser._id) >= 0;
		};

		$scope.showDeleteCommentButton = function (comment) {
			var isGroupAdmin = $scope.user.currentUser && $scope.selectedGroup.admin.indexOf($scope.user.currentUser._id) > -1;
			var isCurrentUser = $scope.user.currentUser && (comment && comment.commentedBy._id) === $scope.user.currentUser._id;

			return isGroupAdmin || isCurrentUser;
		};
	}
})();