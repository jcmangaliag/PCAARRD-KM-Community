'use strict';

(function () {
	'use strict';

	angular.module('users').factory('UserAuthenticationService', UserAuthenticationService);

	UserAuthenticationService.$inject = ['$http', '$window', '$q', '$state', 'UserService', 'ngToast', '$timeout', 'GroupService', 'PostService'];

	function UserAuthenticationService($http, $window, $q, $state, UserService, ngToast, $timeout, GroupService, PostService) {

		var saveToken = function saveToken(token) {
			$window.localStorage['pcaarrdcommunity-token'] = token;
		};

		var getToken = function getToken() {
			return $window.localStorage['pcaarrdcommunity-token'];
		};

		var logout = function logout() {
			$window.localStorage.removeItem('pcaarrdcommunity-token');
			$state.go('communityHome');
		};

		var isLoggedIn = function isLoggedIn() {
			var token = getToken();
			var payload = void 0;

			if (token) {
				payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		var getCurrentUserID = function getCurrentUserID() {
			if (isLoggedIn()) {
				var token = getToken();
				var payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);

				return payload._id;
			} else {
				return null;
			}
		};

		var getCurrentUser = function getCurrentUser() {
			if (isLoggedIn()) {
				var deferred = $q.defer();

				var token = getToken();
				var payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);

				UserService.getOneUser(payload._id).then(function (result) {
					deferred.resolve(result);
				}, function (error) {
					// show 404 not found page
					deferred.reject(result);
				});

				return deferred.promise;
			}
		};

		var register = function register(userFormData, password, enteredAccessKey) {
			var deferred = $q.defer();
			var requestBody = { userFormData: userFormData, password: password };

			if (userFormData.isAdmin && !enteredAccessKey) {
				deferred.reject({ data: { message: 'Invalid Access Key!!' } });
				return deferred.promise;
			} else if (userFormData.isAdmin) requestBody.enteredKey = enteredAccessKey;

			$http.post('/api/users/register/', requestBody).then(function (response) {
				saveToken(response.data.token);
				deferred.resolve(response.data.token);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var login = function login(userCredentials) {
			var deferred = $q.defer();

			$http.post('/api/users/login/', userCredentials).then(function (response) {
				saveToken(response.data.token);
				deferred.resolve(response.data.token);
			}, function (response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		var allowAdminRegistration = function allowAdminRegistration(enteredKey) {
			var deferred = $q.defer();

			$http.post('api/users/allow-admin-registration', { enteredKey: enteredKey }).then(function (response) {
				deferred.resolve(response.data.allow);
			}, function (response) {
				deferred.reject(response.data.allow);
			});

			return deferred.promise;
		};

		var loginFirst = function loginFirst() {
			ngToast.create({
				className: 'danger',
				content: 'You are currently not logged in. Please sign in first!'
			});

			$state.go('login');
		};

		/* Page Authentication Functions */

		var authenticateLoggedOut = function authenticateLoggedOut() {
			// for pages only visible to logged out users
			var deferred = $q.defer();

			if (isLoggedIn()) {
				$timeout(function () {
					return $state.go('communityHome');
				});
				deferred.reject();
			} else {
				deferred.resolve();
			}

			return deferred.promise;
		};

		var authenticateLoggedIn = function authenticateLoggedIn() {
			// for pages only visible to logged in users
			var deferred = $q.defer();

			if (isLoggedIn()) {
				deferred.resolve();
			} else {
				$timeout(function () {
					return $state.go('login');
				});
				deferred.reject();
			}

			return deferred.promise;
		};

		var authenticateSiteAdmin = function authenticateSiteAdmin() {
			// for pages only visible to site admin
			var deferred = $q.defer();

			authenticateLoggedIn().then(function () {
				return getCurrentUser();
			}, function () {
				return $q.reject();
			}).then(function (user) {
				if (user.isAdmin) {
					deferred.resolve();
				} else {
					$timeout(function () {
						return $state.go('communityHome');
					});
					deferred.reject();
				}
			}, function () {
				deferred.reject();
			});

			return deferred.promise;
		};

		var authenticateCurrentUserOrSiteAdmin = function authenticateCurrentUserOrSiteAdmin(userID) {
			// for pages only visible to current user or site admin
			var deferred = $q.defer();

			authenticateLoggedIn().then(function () {
				return getCurrentUser();
			}, function () {
				return $q.reject();
			}).then(function (user) {
				if (user._id === userID || user.isAdmin) {
					deferred.resolve();
				} else {
					$timeout(function () {
						return $state.go('communityHome');
					});
					deferred.reject();
				}
			}, function () {
				deferred.reject();
			});

			return deferred.promise;
		};

		var authenticateGroupAdminOrSiteAdmin = function authenticateGroupAdminOrSiteAdmin(groupHandle) {
			// for pages only visible to group admin or site admin
			var deferred = $q.defer();
			var currentUser = null;

			authenticateLoggedIn().then(function () {
				return getCurrentUser();
			}, function () {
				return $q.reject();
			}).then(function (user) {
				currentUser = user;
				return GroupService.getOneGroup(groupHandle);
			}, function () {
				return $q.reject();
			}).then(function (group) {
				if (group.admin.indexOf(currentUser._id) > -1 || currentUser.isAdmin) {
					deferred.resolve();
				} else {
					$timeout(function () {
						return $state.go('communityHome');
					});
					deferred.reject();
				}
			}, function () {
				deferred.reject();
			});

			return deferred.promise;
		};

		var authenticatePostVisiblity = function authenticatePostVisiblity(groupHandle, postID) {
			// proper visibility of private posts; always visible to site admin
			var deferred = $q.defer();
			var selectedPost = {};

			PostService.getOnePost(postID).then(function (post) {
				selectedPost = post;

				if (selectedPost.showPublic) {
					deferred.resolve();
				} else if (isLoggedIn()) {
					// if private post and logged in = check if group member
					return getCurrentUser();
				} else {
					// if private posts and logged out
					return $q.reject();
				}
			}, function () {
				// fail to load post
				return $q.reject();
			}).then(function (user) {
				// only checks private posts
				if (!selectedPost.showPublic && (user.groupsJoined.indexOf(groupHandle) > -1 || user.isAdmin)) {
					deferred.resolve();
				} else if (!selectedPost.showPublic) {
					$timeout(function () {
						return $state.go('oneGroup', { handle: groupHandle });
					});
					deferred.reject();
				}
			}, function () {
				// fail to current user
				$timeout(function () {
					return $state.go('oneGroup', { handle: groupHandle });
				});
				deferred.reject();
			});

			return deferred.promise;
		};

		return {
			saveToken: saveToken,
			getToken: getToken,
			logout: logout,
			isLoggedIn: isLoggedIn,
			getCurrentUserID: getCurrentUserID,
			getCurrentUser: getCurrentUser,
			register: register,
			login: login,
			allowAdminRegistration: allowAdminRegistration,
			loginFirst: loginFirst,
			authenticateLoggedOut: authenticateLoggedOut,
			authenticateLoggedIn: authenticateLoggedIn,
			authenticateSiteAdmin: authenticateSiteAdmin,
			authenticateCurrentUserOrSiteAdmin: authenticateCurrentUserOrSiteAdmin,
			authenticateGroupAdminOrSiteAdmin: authenticateGroupAdminOrSiteAdmin,
			authenticatePostVisiblity: authenticatePostVisiblity
		};
	}
})();