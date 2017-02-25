(() => {
	'use strict';
	
	angular
		.module('shared')
		.config(sharedToast);

	sharedToast.$inject = ['ngToastProvider'];

	function sharedToast (ngToastProvider) {
		ngToastProvider.configure({
      		maxNumber: 3,
      		timeout: 3000,
      		animation: 'slide'
    	});
	}

})();

