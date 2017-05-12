(() => {
	'use strict';
	
	angular
		.module('groups')
		.directive('groupClassifications', groupClassifications);


	function groupClassifications () {

		const directive = {
			restrict: 'E',
			templateUrl: '/groups/client/views/group-classifications.client.view.html'
		}

		return directive;
	}

})();

