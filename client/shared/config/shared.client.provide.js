(() => {
	'use strict';
	
	angular
		.module('shared')
		.config(provide);

	provide.$inject = ['$provide'];

	function provide ($provide) {
		$provide.decorator('$uiViewScroll', function ($delegate) {
		    return function (uiViewElement) {
		        window.scrollTo(0, 0);	// scrolls to top when ui-view autoscroll is true
		    }; 
		  });
	}

})();

