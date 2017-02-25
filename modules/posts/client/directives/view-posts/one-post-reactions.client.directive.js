(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('onePostReactions', onePostReactions);

	function onePostReactions () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/view-posts/one-post-reactions.client.view.html'
		}

		return directive;
	}

})();

