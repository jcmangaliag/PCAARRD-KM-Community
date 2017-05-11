'use strict';

(function () {
	'use strict';

	angular.module('shared').controller('SharedAddHashtagsController', SharedAddHashtagsController);

	SharedAddHashtagsController.$inject = ['$scope'];

	function SharedAddHashtagsController($scope) {
		$scope.hashtags = [''];
		$scope.MIN_HASHTAG = 1;

		$scope.addHashtag = function () {
			$scope.hashtags.push('');
		};

		$scope.removeHashtag = function () {
			if ($scope.hashtags.length > $scope.MIN_HASHTAG) {
				$scope.hashtags.pop();
			}
		};

		$scope.clearHashtags = function () {
			$scope.hashtags.length = 0;
			$scope.hashtags.push('');
		};
	}
})();