(() => {
	'use strict';
	
	angular
		.module('groups')
		.factory('GroupClassificationService', GroupClassificationService);

	GroupClassificationService.$inject = ['$http', 'ngToast', '$q'];

	function GroupClassificationService ($http, ngToast, $q) {

		let groupClassificationList = { contents: [] }, groupClassificationListCopy = { contents: [] };

		const getGroupClassificationList = () => {
			return groupClassificationList;
		}

		const getGroupClassificationListCopy = () => {
			return groupClassificationListCopy;
		}

		const getAllGroupClassifications = () => {
			const deferred = $q.defer();

			$http.get('/api/groups/classifications')
			.then((response) => {
				groupClassificationList.contents = response.data.groupClassifications;
				groupClassificationListCopy.contents = _.toArray(response.data.groupClassifications);
				deferred.resolve(response.data.groupClassifications);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const submitGroupClassification = (addGroupClassificationFormData) => {
			const deferred = $q.defer();

			$http.post('/api/groups/classifications', addGroupClassificationFormData)
			.then(response => {
				deferred.resolve(response);

				getAllGroupClassifications();

				ngToast.create({
		    		className: 'success',
		    		content: `Group classification was successfully added. `
		    	});
			});

			return deferred.promise;
		}
	
		return {
			getGroupClassificationList,
			getGroupClassificationListCopy,
			getAllGroupClassifications,
			submitGroupClassification
		};
	}

})();

