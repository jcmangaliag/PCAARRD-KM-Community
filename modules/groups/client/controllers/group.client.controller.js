(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('GroupController', GroupController);

	GroupController.$inject = ['$scope', '$state'];

	function GroupController ($scope, $state) {
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