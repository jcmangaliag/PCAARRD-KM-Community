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
				deferred.resolve(response);
				ViewPostsCategoriesService.setCurrentViewPostsCategory(addPostFormData.category);
				const capitalizedCategory = addPostFormData.category.charAt(0).toUpperCase() + addPostFormData.category.slice(1);
				
				ngToast.create({
		    		className: 'success',
		    		content: `${capitalizedCategory} was successfully posted. `
		    	});
			});

			return deferred.promise;
		}
	
		return {
			submitPost
		};
	}

})();

