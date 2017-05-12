(() => {
	'use strict';
	
	angular
		.module('posts')
		.directive('addPostPrivacy', addPostPrivacy);

	function addPostPrivacy () {

		const directive = {
			restrict: 'E',
			templateUrl: '/posts/views/add-post/add-post-privacy.client.view.html'
		}

		return directive;
	}

})();

