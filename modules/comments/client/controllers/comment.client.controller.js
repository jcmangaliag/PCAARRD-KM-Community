import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('comments')
		.controller('CommentController', CommentController);

	CommentController.$inject = ['$scope', '$state', '$q', 'CommentService', 'PostService', 'SharedPaginationService', 'ngToast', 'SharedUploadService', 'UserAuthenticationService', 'UserService'];

	function CommentController ($scope, $state, $q, CommentService, PostService, SharedPaginationService, ngToast, SharedUploadService, UserAuthenticationService, UserService) {
		$scope.addCommentFormData = {};
		const {submitComment} = CommentService;
		$scope.submitComment = _.partial(submitComment);
		$scope.comments = CommentService.getCommentList();
		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.commentsPerPage = 5;

		$scope.user = {};
		$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

		if ($scope.user.isLoggedIn){
			UserAuthenticationService.getCurrentUser()
		    	.then((result)=> {
		    		$scope.user.currentUser = result;
		    	});
	    }

		$scope.clearCommentForm = () => {
			$scope.addCommentFormData = null;
			$scope.clearUploadFiles();
			$scope.clearTechnologyHandles();
			$scope.technologyHandle.enable = false;
			$scope.clearUploadFiles();
			$scope.clearHashtags();
		}
		
		$scope.onProcessCommentData = (postID) => {
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			$scope.addCommentFormData.referredPost = postID;
			$scope.addCommentFormData.groupBelonged = $scope.selectedGroup.handle;

			if ($scope.technologyHandle.enable){
				$scope.addCommentFormData.technologyHandles = $scope.selectedTechnologies;
			}
			$scope.addCommentFormData.hashtags = $scope.hashtags;

			$scope.addCommentFormData.dateCommented = moment().format('MMMM Do YYYY, h:mm:ss a');
			$scope.addCommentFormData.reactions = [
				{ 
				  name: "thumbsUp", 
				  count: 0,
				  users: [] 
				},
				{ 
				  name: "happy", 
				  count: 0,
				  users: [] 
				},
				{ 
				  name: "sad", 
				  count: 0,
				  users: [] 
				}
			];

			if ($scope.user.isLoggedIn){
				$scope.addCommentFormData.commentedBy = {
					_id: $scope.user.currentUser._id,
					name: `${$scope.user.currentUser.name.first} ${$scope.user.currentUser.name.last}`
				}

			}

			const commentedBy = $scope.addCommentFormData.commentedBy;

			if ($scope.selectedUploadFiles.length > 0){
				let uploadedFiles = [];
				$scope.progressBarON = true;
				SharedUploadService.uploadFiles($scope.selectedUploadFiles, uploadedFiles)
					.then((result) => {
						$scope.progressBarON = false;
						$scope.addCommentFormData.files = uploadedFiles;
						
						$scope.submitComment(_.cloneDeep($scope.addCommentFormData));
						PostService.getOnePost($scope.selectedPost._id)	// check post for update
							.then((result) => {
								PostService.setPostReaction($scope, result, 0, commentedBy);	// increment post's comment count
							}, (error) => {
								// show 404 not found page
							});
						
						$scope.clearCommentForm();

					}, (error) => {
						$scope.progressBarON = false;
						ngToast.create({
				    		className: 'danger',
				    		content: `Error: ${error.data.message}`
				    	});
					})
			} else {
				$scope.submitComment(_.cloneDeep($scope.addCommentFormData));
				PostService.getOnePost($scope.selectedPost._id)	// check post for update
					.then((result) => {
						PostService.setPostReaction($scope, result, 0, commentedBy);	// increment post's comment count
					}, (error) => {
						// show 404 not found page
					});
				
				$scope.clearCommentForm();
			}
		}

		$scope.onSetCommentReaction = (comment, selectedGroupHandle, reactionIndex) => {
			if (UserAuthenticationService.isLoggedIn() && $scope.user.currentUser && $scope.user.currentUser.groupsJoined.indexOf(selectedGroupHandle) > -1){
				CommentService.getOneComment(comment._id)
					.then((result) => {
						const user = {
							_id: $scope.user.currentUser._id, 
							name: `${$scope.user.currentUser.name.first} ${$scope.user.currentUser.name.last}`
						};

						CommentService.setCommentReaction(result, reactionIndex, user);
						comment.reactions = result.reactions;
					}, (error) => {
						// show 404 not found page
					});
			} else {
				ngToast.create({
		    		className: 'warning',
		    		content: `You must join the group first before reacting.`
		    	});
			}
		}

		$scope.onDeleteComment = (comment) => {
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
			} else {
				CommentService.deleteOneComment(comment)
				.then((result) => {
					return PostService.getOnePost($scope.selectedPost._id);	// update selected post
				}, (error) => {
					return $q.reject(error);
					// comment to be deleted not found
				})
				.then((result) => {
					$scope.selectedPost = result;
					// find all comments of the same author of the current post
					return CommentService.getCommentsByUser($state.params.postID, comment.commentedBy._id);
				}, (error) => {
					return $q.reject(error);
					// referred post not found, but not possible since comments are removed after post deletion
				})
				.then((results) => {	
					PostService.decrementCommentsCount($scope.selectedPost, comment, results.length, comment.commentedBy._id);
				}, (error) => {
					// all comments of the author are not found
					ngToast.create({
			    		className: 'danger',
			    		content: `Error: The comment was not found.`
			    	});
				});
			}	
		}

		CommentService.getComments($state.params.postID);

		$scope.highlightReaction = (selectedReaction) => {
			return $scope.user.currentUser && selectedReaction.users.map((user)=> user._id).indexOf($scope.user.currentUser._id) >=0; 
		}

		$scope.showDeleteCommentButton = (comment) => {
			const isGroupAdmin = $scope.user.currentUser && $scope.selectedGroup.admin.indexOf($scope.user.currentUser._id) > -1;
			const isCurrentUser = $scope.user.currentUser && ((comment && comment.commentedBy._id) === $scope.user.currentUser._id);		
			
			return isGroupAdmin || isCurrentUser;
		}
	}

})();