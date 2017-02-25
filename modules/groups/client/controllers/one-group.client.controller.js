(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('OneGroupController', OneGroupController);

	OneGroupController.$inject = ['$scope', '$state'];

	function OneGroupController ($scope, $state) {
		$scope.$watch(function(){
		    return $state.$current.name
		}, function(newCurrentStateName){
		    $scope.viewOnePost = $state.current.name.indexOf('oneGroup.viewOne') >= 0? true: false;
		});
	}

})();