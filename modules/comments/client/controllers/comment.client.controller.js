import moment from 'moment';
import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('comments')
		.controller('CommentController', CommentController);

	CommentController.$inject = ['$scope', 'CommentService', 'PostService'];

	function CommentController ($scope, CommentService, PostService) {
		$scope.addCommentFormData = {};
		const {submitComment, setCommentReaction} = CommentService;
		$scope.submitComment = _.partial(submitComment);
		$scope.setCommentReaction = _.partial(setCommentReaction);
		$scope.userid = CommentService.userid;	// temporary userid

		$scope.comments = CommentService.getCommentList();
		
		$scope.onProcessCommentData = (postID) => {
			$scope.addCommentFormData.referredPost = postID;
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
			$scope.submitComment(_.cloneDeep($scope.addCommentFormData));
			PostService.setPostReaction($scope, $scope.selectedPost, 0);
			$scope.addCommentFormData = null;
			$scope.clearHashtags();
		}

		CommentService.getComments();
	}

})();