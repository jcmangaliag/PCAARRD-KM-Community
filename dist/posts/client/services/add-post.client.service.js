'use strict';

(function () {
	'use strict';

	angular.module('posts').factory('AddPostService', AddPostService);

	AddPostService.$inject = ['$http', 'ngToast', 'ViewPostsCategoriesService', '$q'];

	function AddPostService($http, ngToast, ViewPostsCategoriesService, $q) {

		var submitPost = function submitPost(addPostFormData) {
			var deferred = $q.defer();

			$http.post('/api/posts', addPostFormData).then(function (response) {
				deferred.resolve(response);
				ViewPostsCategoriesService.setCurrentViewPostsCategory(addPostFormData.category);
				var capitalizedCategory = addPostFormData.category.charAt(0).toUpperCase() + addPostFormData.category.slice(1);

				ngToast.create({
					className: 'success',
					content: capitalizedCategory + ' was successfully posted. '
				});
			});

			return deferred.promise;
		};

		return {
			submitPost: submitPost
		};
	}
})();