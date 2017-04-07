(() => {
	'use strict';
	
	angular
		.module('shared')
		.factory('SharedPaginationService', SharedPaginationService);

	function SharedPaginationService () {

		const pageLimit = (currentPage, itemsPerPage) => {
    		return currentPage * itemsPerPage;
    	}

    	const loadMoreItems = (paginate) => {
    		paginate.currentPage++;
    	}

    	const hasMoreItems = (currentPage, itemsPerPage, itemsLength) => {
    		return currentPage < (itemsLength / itemsPerPage);
    	}
	
		return {
			pageLimit,
			loadMoreItems,
			hasMoreItems
		};
	}

})();

