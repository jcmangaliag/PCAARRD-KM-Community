(() => {
	'use strict';
	
	angular
		.module('posts')
		.factory('AddPostService', AddPostService);

	AddPostService.$inject = ['$http', 'ngToast', 'ViewPostsCategoriesService', '$q'];

	function AddPostService ($http, ngToast, ViewPostsCategoriesService, $q) {

		const submitPost = (addPostFormData) => {
			const deferred = $q.defer();

			$http.post('/api/posts', addPostFormData)
			.then(response => {
				deferred.resolve(addPostFormData);
				ViewPostsCategoriesService.setCurrentViewPostsCategory(addPostFormData.category);

				ngToast.create({
		    		className: 'success',
		    		content: `${addPostFormData.category} was successfully posted. `
		    	});
			});

			return deferred.promise;
		}
	
		return {
			submitPost
		};
	}

})();

