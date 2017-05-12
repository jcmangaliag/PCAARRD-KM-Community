(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('postsFilterPanel', postsFilterPanel);

	function postsFilterPanel () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/views/posts-filter-panel.client.view.html'
		}

		return directive;
	}

})();

