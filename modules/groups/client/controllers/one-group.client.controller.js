(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('OneGroupController', OneGroupController);

	OneGroupController.$inject = ['$scope', '$state'];

	function OneGroupController ($scope, $state) {
		$scope.autoScroll = { 
			status: false
		}

		$scope.$watch(() => {
		    return $state.$current.name;
		}, (newCurrentStateName) => {
		    $scope.viewOnePost = $state.current.name.indexOf('oneGroup.viewOne') >= 0? true: false;
		});

		$scope.autoScrollPost = (option) => {
			$scope.autoScroll.status = option;
		}
	}

})();