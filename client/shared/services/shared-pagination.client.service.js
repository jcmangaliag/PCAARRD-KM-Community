(() => {
	'use strict';
	
	angular
		.module('shared')
		.factory('SharedPaginationService', SharedPaginationService);

	function SharedPaginationService () {

		const pageLimit = (currentPage, itemsPerPage) => {	// limits the number of items shown
    		return currentPage * itemsPerPage;
    	}

    	const loadMoreItems = (paginate) => {	// increases number of items shown by increasing curentPage
    		paginate.currentPage++;
    	}

    	const hasMoreItems = (currentPage, itemsPerPage, itemsLength) => {	// checks if there are next pages
    		return currentPage < (itemsLength / itemsPerPage);
    	}
	
		return {
			pageLimit,
			loadMoreItems,
			hasMoreItems
		};
	}

})();

