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
		const {submitComment} = CommentService;
		$scope.submitComment = _.partial(submitComment);
		
		$scope.onProcessCommentData = (postID) => {
			$scope.addCommentFormData.referredPost = postID;
			$scope.addCommentFormData.hashtags = $scope.hashtags;
			$scope.addCommentFormData.dateCommented = moment().format('MMMM Do YYYY, h:mm:ss a');
			$scope.addCommentFormData.reactions = [
				{ 
				  name: "thumbsUp", 
				  count: 0 
				},
				{ 
				  name: "happy", 
				  count: 0 
				},
				{ 
				  name: "sad", 
				  count: 0 
				},
				{ 
				  name: "angry", 
				  count: 0 
				}
			];

			// hardcoded as of now, should be Object ID
			$scope.addCommentFormData.commentedBy = "John Doe";

			$scope.submitComment(_.cloneDeep($scope.addCommentFormData));
			PostService.setReaction($scope, 0);
		}

		CommentService.getComments($scope);
	}

})();