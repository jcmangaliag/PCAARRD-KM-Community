'use strict';

(function () {
	'use strict';

	angular.module('shared').factory('SharedPaginationService', SharedPaginationService);

	function SharedPaginationService() {

		var pageLimit = function pageLimit(currentPage, itemsPerPage) {
			return currentPage * itemsPerPage;
		};

		var loadMoreItems = function loadMoreItems(paginate) {
			paginate.currentPage++;
		};

		var hasMoreItems = function hasMoreItems(currentPage, itemsPerPage, itemsLength) {
			return currentPage < itemsLength / itemsPerPage;
		};

		return {
			pageLimit: pageLimit,
			loadMoreItems: loadMoreItems,
			hasMoreItems: hasMoreItems
		};
	}
})();