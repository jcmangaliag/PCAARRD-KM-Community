import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('home')
		.controller('LoggedInHomeController', LoggedInHomeController);

	LoggedInHomeController.$inject = ['$scope', 'LoggedInHomeService'];

	function LoggedInHomeController ($scope, LoggedInHomeService) {
		$scope.buttonName = {
			btnName: 'Hide typed message'
		};

		$scope.homeChoices = [
			{
				name: 'darkfire09',
				isCompleted: false,
				isEditing: false
			}
		];

		LoggedInHomeService.getTask($scope);

		$scope.homeClick = (homeChoices, buttonName) => {
			
			homeChoices.isEditing = !homeChoices.isEditing;
			buttonName.btnName = buttonName.btnName == "Hide typed message"? "Show typed message" : "Hide typed message";
		};




		let params = {
			createHasInput: false
		};

		/*$scope.todos = [
			{
				task: 'do dishes',
				isCompleted: false,
				isEditing: false
			},
			{
				task: 'walk the dog',
				isCompleted: true,
				isEditing: false
			}
		];*/

		LoggedInHomeService.getTasks($scope);

		$scope.onCompletedClick = todo => {
			todo.isCompleted = !todo.isCompleted;
		};

		$scope.onEditClick = todo => {
			todo.isEditing = true;
			todo.updatedTask = todo.task;
		};

		$scope.onCancelClick = todo => {
			todo.isEditing = false;
		};

		const {createTask, updateTask, deleteTask, watchCreateTaskInput} = LoggedInHomeService;

		$scope.createTask = _.partial(createTask, $scope, params);
		$scope.updateTask = _.partial(updateTask, $scope);
		$scope.deleteTask = _.partial(deleteTask, $scope);
		$scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));
	}

})();