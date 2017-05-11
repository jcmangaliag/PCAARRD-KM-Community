'use strict';

var _lodash = require('lodash/lodash.min');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	angular.module('groups').factory('GroupService', GroupService);

	GroupService.$inject = ['$http', 'ngToast', '$q'];

	function GroupService($http, ngToast, $q) {

		var groupList = { contents: [] },
		    groupListCopy = { contents: [] };

		var getGroupList = function getGroupList() {
			return groupList;
		};

		var getGroupListCopy = function getGroupListCopy() {
			return groupListCopy;
		};

		var getAllGroups = function getAllGroups() {
			var deferred = $q.defer();

			$http.get('/api/groups').then(function (response) {
				groupList.contents = response.data.groups;
				groupListCopy.contents = _lodash2.default.toArray(response.data.groups);
				deferred.resolve(response.data.groups);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getMyGroups = function getMyGroups(userID) {
			var deferred = $q.defer();

			$http.get('/api/groups/my-groups/' + userID).then(function (response) {
				groupList.contents = response.data.groups;
				groupListCopy.contents = _lodash2.default.toArray(response.data.groups);

				deferred.resolve(response.data.groups);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getDiscoverGroups = function getDiscoverGroups(userID) {
			var deferred = $q.defer();

			$http.get('/api/groups/discover-groups/' + userID).then(function (response) {
				groupList.contents = response.data.groups;
				groupListCopy.contents = _lodash2.default.toArray(response.data.groups);

				deferred.resolve(response.data.groups);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getSomeGroups = function getSomeGroups(groupHandlesList) {
			var deferred = $q.defer();

			var groupsList = groupHandlesList.toString();
			$http.get('/api/groups/some/' + groupsList).then(function (response) {
				deferred.resolve(response.data.groups);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getUserAdministeredGroups = function getUserAdministeredGroups(userID) {
			var deferred = $q.defer();

			$http.get('/api/groups/administered/' + userID).then(function (response) {
				deferred.resolve(response.data.groups);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getUserPendingGroups = function getUserPendingGroups(userID) {
			var deferred = $q.defer();

			$http.get('/api/groups/pending/' + userID).then(function (response) {
				deferred.resolve(response.data.groups);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var getOneGroup = function getOneGroup(groupHandle) {
			var deferred = $q.defer();

			$http.get('/api/groups/' + groupHandle).then(function (response) {
				deferred.resolve(response.data.group);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var updateGroup = function updateGroup(groupHandle, updatedFields) {
			var deferred = $q.defer();
			$http.put('/api/groups/' + groupHandle, updatedFields).then(function (response) {
				deferred.resolve(response);
				// should refresh the one group
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var submitGroup = function submitGroup(addGroupFormData) {
			var deferred = $q.defer();

			$http.post('/api/groups', addGroupFormData).then(function (response) {
				deferred.resolve(response);

				ngToast.create({
					className: 'success',
					content: 'Group was successfully created. '
				});
			});

			return deferred.promise;
		};

		var removeAdmin = function removeAdmin(userID, groupHandle) {
			var deferred = $q.defer();

			$http.put('/api/groups/' + groupHandle + '/remove-admin/' + userID).then(function (response) {
				deferred.resolve(response);
			}, function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

		var addToGroupPendingMembersList = function addToGroupPendingMembersList(userID, groupHandle) {
			var deferred = $q.defer();

			$http.put('/api/groups/' + groupHandle + '/add-to-pending-members/' + userID).then(function (response) {
				deferred.resolve(response);
			}, function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

		var removeFromGroupPendingMembersList = function removeFromGroupPendingMembersList(userID, groupHandle) {
			var deferred = $q.defer();

			$http.put('/api/groups/' + groupHandle + '/remove-from-pending-members/' + userID).then(function (response) {
				deferred.resolve(response);
			}, function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

		return {
			getGroupList: getGroupList,
			getGroupListCopy: getGroupListCopy,
			getAllGroups: getAllGroups,
			getMyGroups: getMyGroups,
			getDiscoverGroups: getDiscoverGroups,
			getSomeGroups: getSomeGroups,
			getUserAdministeredGroups: getUserAdministeredGroups,
			getUserPendingGroups: getUserPendingGroups,
			getOneGroup: getOneGroup,
			updateGroup: updateGroup,
			submitGroup: submitGroup,
			removeAdmin: removeAdmin,
			addToGroupPendingMembersList: addToGroupPendingMembersList,
			removeFromGroupPendingMembersList: removeFromGroupPendingMembersList
		};
	}
})();