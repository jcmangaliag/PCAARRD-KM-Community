(() => {
	'use strict';
	
	angular
		.module('groups')
		.factory('GroupClassificationService', GroupClassificationService);

	GroupClassificationService.$inject = ['$http', 'ngToast', '$q'];

	function GroupClassificationService ($http, ngToast, $q) {

		const submitGroupClassification = (addGroupClassificationFormData) => {
			const deferred = $q.defer();

			$http.post('/api/groups/classifications', addGroupClassificationFormData)
			.then(response => {
				deferred.resolve(response);

				ngToast.create({
		    		className: 'success',
		    		content: `Group classification was successfully added. `
		    	});
			});

			return deferred.promise;
		}
	
		return {
			submitGroupClassification
		};
	}

})();

