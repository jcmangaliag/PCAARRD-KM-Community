(() => {
	'use strict';
	
	angular
		.module('posts')
		.factory('AddPostService', AddPostService);

	AddPostService.$inject = ['$http', 'ngToast', 'ViewPostsCategoriesService'];

	function AddPostService ($http, ngToast, ViewPostsCategoriesService) {

		const submitPost = (addPostFormData) => {
			$http.post('/api/posts', addPostFormData)
			.then(response => {
				ViewPostsCategoriesService.setCurrentViewPostsCategory(addPostFormData.category);

				ngToast.create({
		    		className: 'success',
		    		content: `${addPostFormData.category} was successfully posted. `
		    	});
			});
		}


		return {
			submitPost
		};
	}

})();

