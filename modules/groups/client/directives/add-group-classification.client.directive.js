(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('addGroupClassification', addGroupClassification);


	function addGroupClassification () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/add-group-classification.client.view.html'
		}

		return directive;
	}

})();

