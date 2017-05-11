'use strict';

(function () {
	'use strict';

	angular.module('posts').directive('addAdvertisementPost', addAdvertisementPost);

	function addAdvertisementPost() {

		var directive = {
			restrict: 'E',
			templateUrl: '/posts/client/views/add-post/add-advertisement-post.client.view.html',
			controller: 'AddPostController'
		};

		return directive;
	}
})();