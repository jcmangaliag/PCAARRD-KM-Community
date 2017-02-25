(() => {
	'use strict';
	
	angular
		.module('shared')
		.controller('SharedAddHashtagsController', SharedAddHashtagsController);

	SharedAddHashtagsController.$inject = ['$scope'];

	function SharedAddHashtagsController ($scope) {
		$scope.hashtags = [''];

		$scope.addHashtag = () => {
			if ($scope.hashtags.length < 5){
				$scope.hashtags.push('');
			}
		}

		$scope.removeHashtag = () => {
			if ($scope.hashtags.length > 1){
				$scope.hashtags.pop();
			}
		}

		$scope.clearHashtags = () => {
			$scope.hashtags.length = 0;
			$scope.hashtags.push('');
		}
	}

})();