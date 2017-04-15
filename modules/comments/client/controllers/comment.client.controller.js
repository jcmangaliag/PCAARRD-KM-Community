import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('comments')
		.controller('CommentController', CommentController);

	CommentController.$inject = ['$scope', '$state', '$q', 'CommentService', 'PostService', 'SharedPaginationService', 'ngToast', 'SharedUploadFilesService'];

	function CommentController ($scope, $state, $q, CommentService, PostService, SharedPaginationService, ngToast, SharedUploadFilesService) {
		$scope.addCommentFormData = {};
		const {submitComment} = CommentService;
		$scope.submitComment = _.partial(submitComment);
		$scope.userid = CommentService.userid;	// temporary userid
		$scope.comments = CommentService.getCommentList();
		$scope.paginate = SharedPaginationService;
		$scope.paginate.currentPage = 1;
		$scope.paginate.commentsPerPage = 3;

		$scope.clearCommentForm = () => {
			$scope.addCommentFormData = null;
			$scope.clearUploadFiles();
			$scope.clearTechnologyHandles();
			$scope.technologyHandle.enable = false;
			$scope.clearUploadFiles();
			$scope.clearHashtags();
		}
		
		$scope.onProcessCommentData = (postID) => {
			$scope.addCommentFormData.referredPost = postID;
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

			// hardcoded as of now, should be Object ID
			$scope.addCommentFormData.commentedBy = "Mark Eric Cabanli";

			if ($scope.selectedUploadFiles.length > 0){
				let uploadedFiles = [];
				$scope.progressBarON = true;
				SharedUploadFilesService.uploadFiles($scope.selectedUploadFiles, uploadedFiles)
					.then((result) => {
						$scope.progressBarON = false;
						$scope.addCommentFormData.files = uploadedFiles;
						
						$scope.submitComment(_.cloneDeep($scope.addCommentFormData));
						PostService.getOnePost($scope.selectedPost._id)	// check post for update
							.then((result) => {
								PostService.setPostReaction($scope, result, 0);	// increment post's comment count
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
						PostService.setPostReaction($scope, result, 0);	// increment post's comment count
					}, (error) => {
						// show 404 not found page
					});
				
				$scope.clearCommentForm();
			}
		}

		$scope.onSetCommentReaction = (comment, reactionIndex) => {
			CommentService.getOneComment(comment._id)
				.then((result) => {
					CommentService.setCommentReaction(result, reactionIndex);
					comment.reactions = result.reactions;
				}, (error) => {
					// show 404 not found page
				});
		}

		$scope.onDeleteComment = (comment) => {
			CommentService.deleteOneComment(comment)
				.then((result) => {
					return PostService.getOnePost($scope.selectedPost._id);
				}, (error) => {
					return $q.reject(error);
					// comment to be deleted not found
				})
				.then((result) => {
					$scope.selectedPost = result;
					return CommentService.getCommentsByUser($state.params.postID, "MarkEricCabanli");
				}, (error) => {
					return $q.reject(error);
					// referred post not found, but not possible since comments are removed after post deletion
				})
				.then((results) => {
					PostService.decrementCommentsCount($scope.selectedPost, comment, results.length, "Mark's id");
				}, (error) => {
					// all comments of the author are not found
					ngToast.create({
			    		className: 'danger',
			    		content: `Error: The comment was not found.`
			    	});
				});

		}

		CommentService.getComments($state.params.postID);
	}

})();