(() => {
	'use strict';
	
	angular
		.module('groups')
		.controller('SampleBananaGroupController', SampleBananaGroupController);

	SampleBananaGroupController.$inject = ['$scope', '$state'];

	function SampleBananaGroupController ($scope, $state) {
		$scope.groupTabs = [
			{
				name: 'About Group',
				state: '.about'
			},
			{
				name: 'Add Post',
				state: '.addPost'
			},
			{
				name: 'View Posts',
				state: '.viewPosts'
			},
			{
				name: 'Settings',
				state: '.settings'
			}
		];

		$scope.setActiveTab = (groupTab) => {
			$scope.activeTab = groupTab;
		}

		$scope.groupTabs.forEach((groupTab)=> {
			if ($state.current.name.indexOf(groupTab.state) >= 0){
				$scope.activeTab = groupTab.name;
			}
		});
	}

})();