import moment from 'moment';
import _ from 'lodash/lodash.min';

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
		    	.then((result)=> {	// get all info of logged in user
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
		
		$scope.onProcessCommentData = (postID) => {	// processing before submitting comment
			if (!UserAuthenticationService.isLoggedIn()){
				UserAuthenticationService.loginFirst();
				return;
			}

			$scope.addCommentFormData.referredPost = postID;
			$scope.addCommentFormData.groupBelonged = $scope.selectedGroup.handle;

			if ($scope.technologyHandle.enable){
				$scope.addCommentFormData.technologyHandles = $scope.selectedTechnologies;
			}
			$scope.addCommentFormData.hashtags = $scope.hashtags;	// from SharedAddHashtags controller

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
				let uploadedFiles = [];	// will contain info of uploaded files
				$scope.progressBarON = true;
				SharedUploadService.uploadFiles($scope.selectedUploadFiles, uploadedFiles)
					.then((result) => {
						$scope.progressBarON = false;
						$scope.addCommentFormData.files = uploadedFiles;
						
						$scope.submitComment(_.cloneDeep($scope.addCommentFormData));	// submit processed comment
						PostService.getOnePost($scope.selectedPost._id)	// check post for update in its comment count
							.then((result) => {
								// increment post's comment count; result = the post object, 0 = index of comment in post's reactions array
								PostService.setPostReaction($scope, result, 0, commentedBy);	
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
			} else {	// if no files to be uploaded
				$scope.submitComment(_.cloneDeep($scope.addCommentFormData));	// submit processed comment
				PostService.getOnePost($scope.selectedPost._id)	// check post for update in its comment count
					.then((result) => {
						// update post's reaction (increasing comment's count and users); result = the updated post object, 0 = index of comment in post's reactions array
						PostService.setPostReaction($scope, result, 0, commentedBy);
					}, (error) => {
						// show 404 not found page
					});
				
				$scope.clearCommentForm();
			}
		}

		$scope.onSetCommentReaction = (comment, selectedGroupHandle, reactionIndex) => {	// processing the user who reacted to a comment
			if (UserAuthenticationService.isLoggedIn() && $scope.user.currentUser && $scope.user.currentUser.groupsJoined.indexOf(selectedGroupHandle) > -1){
				CommentService.getOneComment(comment._id)
					.then((result) => {
						const user = {
							_id: $scope.user.currentUser._id, 
							name: `${$scope.user.currentUser.name.first} ${$scope.user.currentUser.name.last}`
						};
						// update comment's reaction (increasing a reaction's count and users); result = the updated comment object, 
						// reactionIndex = index of a reaction in comment's reactions array
						CommentService.setCommentReaction(result, reactionIndex, user);	
						comment.reactions = result.reactions;	// update the comment's reaction in UI
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
					return PostService.getOnePost($scope.selectedPost._id);	// to update selected post
				}, (error) => {
					return $q.reject(error);
					// comment to be deleted not found
				})
				.then((result) => {
					$scope.selectedPost = result;
					// find all comments of the same user of the current post to accurately change post's comment reaction's users
					return CommentService.getCommentsByUser($state.params.postID, comment.commentedBy._id);
				}, (error) => {
					return $q.reject(error);
				})
				.then((results) => {	
					// decrement post's comment count and remove the user in users list of he has no more comments in the post
					// comment = comment object, results.length = number of comments a user has in a post 
					PostService.decrementCommentsCount($scope.selectedPost, comment, results.length, comment.commentedBy._id);
				}, (error) => {
					ngToast.create({
			    		className: 'danger',
			    		content: `Error: The comment was not found.`
			    	});
				});
			}	
		}

		CommentService.getComments($state.params.postID);

		$scope.highlightReaction = (selectedReaction) => {	// highlight the reaction which the logged in user selected before
			return $scope.user.currentUser && selectedReaction.users.map((user)=> user._id).indexOf($scope.user.currentUser._id) >=0; 
		}

		$scope.showDeleteCommentButton = (comment) => {	// only the comment's author or group admin can delete a comment
			const isGroupAdmin = $scope.user.currentUser && $scope.selectedGroup.admin.indexOf($scope.user.currentUser._id) > -1;
			const isCurrentUser = $scope.user.currentUser && ((comment && comment.commentedBy._id) === $scope.user.currentUser._id);		
			
			return isGroupAdmin || isCurrentUser;
		}
	}

})();