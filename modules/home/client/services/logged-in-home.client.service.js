import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('home')
		.factory('LoggedInHomeService', LoggedInHomeService);

	LoggedInHomeService.$inject = ['$http'];

	function LoggedInHomeService ($http) {

		const getTask = $scope => {
			$scope.homeChoices.pop();
			$scope.homeChoices.push({
				name: 'shiningfire',
				isCompleted: true,
				isEditing: true
			});
		}

		const getTasks = $scope => {
			$http.get('/api/home')
			.then(response => {
				$scope.todos = response.data.todos;
			});
		}

		const createTask = ($scope, params) => {
			if (!$scope.createTaskInput) { return; }
			
			$http.post('/api/home', {
				task: $scope.createTaskInput,
				isCompleted: false,
				isEditing: false
			}).then(response => {
				getTasks($scope);
				$scope.createTaskInput = '';
			});

			//params.createHasInput = false;
			//$scope.createTaskInput = '';
		}

		const updateTask = ($scope, todo) => {

			$http.put(`/api/home/${todo._id}`, {
				task: todo.updatedTask,
			}).then(response => {
				getTasks($scope);
				todo.isEditing = false;
			});

			/*todo.task = todo.updatedTask;
			todo.isEditing = false;*/
		}

		const deleteTask = ($scope, todoToDelete) => {

			$http.delete(`/api/home/${todoToDelete._id}`)
			.then(response => {
				getTasks($scope);
			});

			//_.remove($scope.todos, todo => todo.task === todoToDelete.task);
		}

		const watchCreateTaskInput = (params, $scope, val) => {
			
			const createHasInput = params.createHasInput;

			if (!val && createHasInput){
				$scope.todos.pop();
				params.createHasInput = false;
			} else if (val && !createHasInput){
				$scope.todos.push({task: val, isCompleted: false});
				params.createHasInput = true;
			} else if (val && createHasInput){
				$scope.todos[$scope.todos.length-1].task = val;
			}
		}

		return {
			getTask,
			getTasks,
			createTask,
			updateTask,
			deleteTask,
			watchCreateTaskInput
		};
	}

})();

