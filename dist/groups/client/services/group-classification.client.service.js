'use strict';

(function () {
	'use strict';

	angular.module('groups').factory('GroupClassificationService', GroupClassificationService);

	GroupClassificationService.$inject = ['$http', 'ngToast', '$q'];

	function GroupClassificationService($http, ngToast, $q) {

		var groupClassificationList = { contents: [] },
		    groupClassificationListCopy = { contents: [] };

		var getGroupClassificationList = function getGroupClassificationList() {
			return groupClassificationList;
		};

		var getGroupClassificationListCopy = function getGroupClassificationListCopy() {
			return groupClassificationListCopy;
		};

		var getAllGroupClassifications = function getAllGroupClassifications() {
			var deferred = $q.defer();

			$http.get('/api/groups/classifications').then(function (response) {
				groupClassificationList.contents = response.data.groupClassifications;
				groupClassificationListCopy.contents = _.toArray(response.data.groupClassifications);
				deferred.resolve(response.data.groupClassifications);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var submitGroupClassification = function submitGroupClassification(addGroupClassificationFormData) {
			var deferred = $q.defer();

			$http.post('/api/groups/classifications', addGroupClassificationFormData).then(function (response) {
				deferred.resolve(response);

				getAllGroupClassifications();

				ngToast.create({
					className: 'success',
					content: 'Group classification was successfully added. '
				});
			});

			return deferred.promise;
		};

		var updateGroupClassification = function updateGroupClassification(groupClassificationID, updatedFields) {
			var deferred = $q.defer();

			$http.put('/api/groups/classifications/' + groupClassificationID, updatedFields).then(function (response) {
				deferred.resolve(response);

				getAllGroupClassifications();
			});

			return deferred.promise;
		};

		var deleteOneGroupClassification = function deleteOneGroupClassification(groupClassification) {
			$http.delete('/api/groups/classifications/' + groupClassification._id).then(function (response) {
				getAllGroupClassifications();

				ngToast.create({
					className: 'success',
					content: 'The group classification was successfully deleted.'
				});
			});
		};

		return {
			getGroupClassificationList: getGroupClassificationList,
			getGroupClassificationListCopy: getGroupClassificationListCopy,
			getAllGroupClassifications: getAllGroupClassifications,
			submitGroupClassification: submitGroupClassification,
			updateGroupClassification: updateGroupClassification,
			deleteOneGroupClassification: deleteOneGroupClassification
		};
	}
})();