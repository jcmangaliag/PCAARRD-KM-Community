(() => {
	'use strict';
	
	angular
		.module('shared')
		.controller('SharedHashtagController', SharedHashtagController);

	SharedHashtagController.$inject = ['$scope'];

	function SharedHashtagController ($scope) {
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
	}

})();