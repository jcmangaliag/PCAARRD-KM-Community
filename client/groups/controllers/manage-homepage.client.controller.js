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
		$scope.features = [];
		$scope.edit = {};
		$scope.editFeature = {};
		$scope.delete = {};

		/**
		 * Methods
		 */
		// Fetch slides from server
		HomepageService.getSliders()
			.then((result) => {
				$scope.sliders = result;
			});

		// Fetch features from server
		HomepageService.getFeatures()
			.then((result) => {
				$scope.features = result;
			});

		// Find sliderId from fetched slides then edit
		$scope.toggleEditSliderModal = (sliderId) => {
			$scope.showEditSlider = true;
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
						$scope.showEditSlider = false;

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
					$scope.showEditSlider = false;

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

		// Find featureId from fetched features then edit
		$scope.toggleEditFeatureModal = (featureId) => {
			$scope.showEditFeature = true;
			$scope.editFeature = _.find($scope.features, {'_id' : featureId});
		}

		// Add feature point field. Input fields must have a max length of 5
		$scope.addFeaturePoint = () => {
			if($scope.editFeature.points.length < 5) $scope.editFeature.points.push({ text: '' });
		}

		// Remove feature point field. Input fields must have a min length of 1
		$scope.removeFeaturePoint = () => {
			if($scope.editFeature.points.length > 1) $scope.editFeature.points.pop();
		}

		// Update the edited feature
		$scope.updateFeature = () => {
			// Check if there are no empty fields
			for(let i = 0; i < $scope.editFeature.points.length; i++){
				if (!$scope.editFeature.points[i].text) $scope.editFeature.points.splice(i,1);
			}

			HomepageService.editFeature($scope.editFeature)
				.then(() => {
					// After editing the slider successfully
					$scope.showEditFeature = false;

					ngToast.create({
						className: 'success',
						content: `Feature was successfully edited. `
					});
				});
		}

	}

})();
