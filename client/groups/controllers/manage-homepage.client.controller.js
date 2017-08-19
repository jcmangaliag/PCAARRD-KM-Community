import _ from 'lodash/lodash.min';

(() => {
	'use strict';

	angular
		.module('groups')
		.controller('ManageHomepageController', ManageHomepageController);

	ManageHomepageController.$inject = ['$scope', '$q', 'ngToast', 'HomepageService', 'SharedUploadService'];

	function ManageHomepageController ($scope, $q, ngToast, HomepageService, SharedUploadService) {

		/**
		 * Properties
		 */
		$scope.sliders = [];
		$scope.edit = {};
		$scope.delete = {};

		/**
		 * Methods
		 */

		// Fetch slides from server
		HomepageService.getSliders()
			.then((result) => {
				$scope.sliders = result;
			});

		// Find sliderId from fetched slides then edit
		$scope.toggleEditSliderModal = (sliderId) => {
			$scope.showDialog = true;
			$scope.edit = _.find($scope.sliders, {'_id' : sliderId});
		};

		// Update the edited slider
		$scope.updateSlider = () => {

			if($scope.selectedPhoto && $scope.selectedPhoto.length > 0){
				$scope.uploadPhotoAndSubmitForm($scope.selectedPhoto[0]);
			}
			else {
				HomepageService.editSlider($scope.edit)
					.then(() => {
						// After editing the slider successfully
						$scope.showDialog = false;

						ngToast.create({
				    		className: 'success',
				    		content: `Slider was successfully edited. `
				    	});
					});
			}
		};

		// Upload photo if it is included then submit form
		$scope.uploadPhotoAndSubmitForm = (photo) => {
			$scope.progressBarON = true;
			SharedUploadService.uploadPhoto(photo)
				.then((result) => {
					// Assign successfully uploaded photo to
					// the slider that should be updated
					$scope.progressBarON = false;
					$scope.edit.backgroundImage = result.data.image.filename;

					return HomepageService.editSlider($scope.edit);
				}, (error) => {
					$scope.progressBarON = false;
					ngToast.create({
			    		className: 'danger',
			    		content: `Error: ${error.data.message}`
			    	});

			    	return $q.reject(error);
				})
				.then(() => {
					// After editing the slider successfully
					$scope.showDialog = false;

					ngToast.create({
			    		className: 'success',
			    		content: `Slider was successfully edited. `
			    	});
				});
		}

		// Find sliderId from fetched slides then wait user for removal
		$scope.toggleDeleteSliderModal = (sliderId) => {
			$scope.delete = _.find($scope.sliders, {'_id' : sliderId});
		}

		// Delete the selected slider
		$scope.removeSlider = () => {

			HomepageService.deleteSlider($scope.delete._id)
				.then(() => {
					// After deleting the slider successfully
					// Update local copy on sliders
					_.remove($scope.sliders, (slider) => {
						return slider._id === $scope.delete._id
					});

					ngToast.create({
						className: 'success',
						content: `Slider was successfully deleted. `
					});
				});
		}

	}

})();
