(() => {
	'use strict';
	
	angular
		.module('groups')
		.factory('GroupService', GroupService);

	GroupService.$inject = ['$http', 'ngToast'];

	function GroupService ($http, ngToast) {

		/*const submitGroupClassification = (addGroupClassificationFormData) => {

			$http.post('/api/groups/classification', addGroupClassificationFormData)
			.then(response => {
		
				ngToast.create({
		    		className: 'success',
		    		content: `Group classification was successfully added. `
		    	});
			});
		}
	
		return {
			submitGroupClassification
		};*/
	}

})();

