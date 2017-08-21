import _ from 'lodash/lodash.min';

(() => {
	'use strict';

	angular
		.module('groups')
		.factory('HomepageService', HomepageService);

	HomepageService.$inject = ['$http', 'ngToast', '$q', 'SharedUploadService'];

	function HomepageService ($http, ngToast, $q, SharedUploadService) {

		let sliders = [];
		let features = [];

		const getSliders = () => {
			const deferred = $q.defer();

			$http.get('/api/sliders')
				.then((response) => {
					// Sort slider according to order
					let sortedArray = _.sortBy(response.data.sliders, ['order']);
					deferred.resolve(sortedArray);
				}, (response) => {
					deferred.reject(response);
				});

			return deferred.promise;
		}

		const editSlider = (editSliderFormData) => {
			const deferred = $q.defer();

			$http.put(`/api/sliders/${editSliderFormData._id}`, editSliderFormData)
				.then((response) => {
					deferred.resolve(response);
				}, (response) => {
					deferred.reject(response);
				});

			return deferred.promise;
		}

		const deleteSlider = (sliderId) => {
			const deferred = $q.defer();

			$http.delete(`/api/sliders/${sliderId}`)
				.then((response) => {
					deferred.resolve(response);
				}, (response) => {
					deferred.reject(response);
				});

			return deferred.promise;
		}

		const getFeatures = () => {
			const deferred = $q.defer();

			$http.get('/api/features')
				.then((response) => {
					deferred.resolve(response.data.features);
				}, (response) => {
					deferred.reject(response);
				});

			return deferred.promise;
		}

		const editFeature = (editFeatureFormData) => {
			const deferred = $q.defer();

			$http.put(`/api/features/${editFeatureFormData._id}`, editFeatureFormData)
				.then((response) => {
					deferred.resolve(response);
				}, (response) => {
					deferred.reject(response);
				});

			return deferred.promise;
		}

		return {
			getSliders,
			editSlider,
			deleteSlider,
			getFeatures,
			editFeature
		};
	}

})();
