import _ from 'lodash/lodash.min';

(() => {
	'use strict';

	angular
		.module('groups')
		.factory('SliderService', SliderService);

	SliderService.$inject = ['$http', 'ngToast', '$q'];

	function SliderService ($http, ngToast, $q) {

		let sliders = [];

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

		const createSlider = (addSlideFormData) => {
			const deffered = $q.defer();

			$http.post('/api/sliders', addSlideFormData)
				.then((response) => {
					deferred.resolve(response);

					ngToast.create({
			    		className: 'success',
			    		content: `Slide was successfully created. `
			    	});
				}, (response) => {
					deferred.reject(response);
				});

			return deferred.promise;
		}

		// const editSlider = (editSliderFormData) => {
		// $http.put(`/api/groups/${groupHandle}`, updatedFields)
		// 	.then(response => {
		// 		deferred.resolve(response);
		// 		// should refresh the one group
		// 	}, (response) => {
		// 		deferred.reject(response);
		// 	});
		//
		// 	return deferred.promise;
		// }

		// const deleteSlider = (sliderId) => {
		//
		// }

		return {
			getSliders,
			createSlider
		};
	}

})();
