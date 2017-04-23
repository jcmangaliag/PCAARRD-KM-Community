(() => {
	'use strict';
	
	angular
		.module('posts')
		.controller('ViewPostsCategoriesController', ViewPostsCategoriesController);

	ViewPostsCategoriesController.$inject = ['$scope', '$stateParams', 'ViewPostsCategoriesService', 'UserAuthenticationService'];

	function ViewPostsCategoriesController ($scope, $stateParams, ViewPostsCategoriesService, UserAuthenticationService) {
		if ($stateParams.handle === '--user--'){
			ViewPostsCategoriesService.setUserID($stateParams.userID);
		} else if ($stateParams.handle === '--my-groups--'){
			ViewPostsCategoriesService.setUserID(UserAuthenticationService.getCurrentUser()._id);
		}
		const {setCurrentViewPostsCategory} = ViewPostsCategoriesService;
		$scope.setCurrentViewPostsCategory = _.partial(setCurrentViewPostsCategory);
		$scope.currentViewPostsCategory = ViewPostsCategoriesService.getCurrentViewPostsCategory();
		$scope.viewPostsCategories = ViewPostsCategoriesService.getViewPostsCategories();
	}

})();