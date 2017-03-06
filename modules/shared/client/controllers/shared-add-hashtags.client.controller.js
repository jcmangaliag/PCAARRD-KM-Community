(() => {
	'use strict';
	
	angular
		.module('shared')
		.controller('SharedAddHashtagsController', SharedAddHashtagsController);

	SharedAddHashtagsController.$inject = ['$scope'];

	function SharedAddHashtagsController ($scope) {
		$scope.hashtags = [''];
		$scope.MIN_HASHTAG = 1;
		$scope.MAX_HASHTAG = 5;

		$scope.addHashtag = () => {
			if ($scope.hashtags.length < $scope.MAX_HASHTAG){
				$scope.hashtags.push('');
			}
		}

		$scope.removeHashtag = () => {
			if ($scope.hashtags.length > $scope.MIN_HASHTAG){
				$scope.hashtags.pop();
			}
		}

		$scope.clearHashtags = () => {
			$scope.hashtags.length = 0;
			$scope.hashtags.push('');
		}
	}

})();