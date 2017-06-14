(() => {
	'use strict';
	
	angular
		.module('users')
		.factory('UserAuthenticationService', UserAuthenticationService);

	UserAuthenticationService.$inject = ['$http', '$window', '$q', '$state', 'UserService', 'ngToast', '$timeout', 'GroupService', 'PostService'];

	function UserAuthenticationService ($http, $window, $q, $state, UserService, ngToast, $timeout, GroupService, PostService) {

		const saveToken = (token) => {
		  $window.localStorage['pcaarrdcommunity-token'] = token;
		}

		const getToken = () => {
		  return $window.localStorage['pcaarrdcommunity-token'];
		}

		const logout = () => {
		  $window.localStorage.removeItem('pcaarrdcommunity-token');
		  $state.go('communityHome');
		}

		const isLoggedIn = () => {	// determines logged in by checking for token that is not expired
		  const token = getToken();
		  let payload;

		  if(token){
		    payload = token.split('.')[1];
		    payload = $window.atob(payload);
		    payload = JSON.parse(payload);
		    return payload.exp > Date.now() / 1000;
		  } else {
		    return false;
		  }
		}

		const getCurrentUserID = () => {	// gets the id of the logged in user
 		  if(isLoggedIn()){
 		    const token = getToken();
 		    let payload = token.split('.')[1];
 		    payload = $window.atob(payload);
 		    payload = JSON.parse(payload);
 
 		    return payload._id;
 		  } else {
 		  	return null;
 		  }
 		}

		const getCurrentUser = () => {	// gets all info of logged in user
			if (isLoggedIn()) {
				const deferred = $q.defer();

				const token = getToken();
				let payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);

				UserService.getOneUser(payload._id)
				    .then((result) => {
						deferred.resolve(result);	// contains all info of user
					}, (error) => {
						// show 404 not found page
						deferred.reject(result);
					});

				return deferred.promise;
			}
		}

		const register = (userFormData, password, enteredAccessKey) => {
			const deferred = $q.defer();
			const requestBody = {userFormData, password};

			if (userFormData.isAdmin && !enteredAccessKey){	// if user got access to admin reg without entering access key
				deferred.reject({data: {message: 'Invalid Access Key!!'}});
				return deferred.promise;
			} else if (userFormData.isAdmin)
				requestBody.enteredKey = enteredAccessKey;	// will later check for the validity of entered access key

			$http.post('/api/users/register/', requestBody)
			.then(response => {
				saveToken(response.data.token);	// after register, automatically logs in the user
		    	deferred.resolve(response.data.token);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const login = (userCredentials) => {
			const deferred = $q.defer();

			$http.post('/api/users/login/', userCredentials)
			.then(response => {	// success login
				saveToken(response.data.token);
				deferred.resolve(response.data.token);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const allowAdminRegistration = (enteredKey) => {	// checks for validity of entered admin reg access key
			const deferred = $q.defer();

			$http.post('api/users/allow-admin-registration', {enteredKey})
			.then((response) => {
				deferred.resolve(response.data.allow);
			}, (response) => {
				deferred.reject(response.data.allow);
			});

			return deferred.promise;
		}

		const loginFirst = () => {	// redirects to login page
			ngToast.create({
	    		className: 'danger',
	    		content: `You are currently not logged in. Please sign in first!`
	    	});

		    $state.go('login');
		}


		/* Page Authentication Functions */


		const authenticateLoggedOut = () => {	// for pages only visible to logged out users
			const deferred = $q.defer();

			if (isLoggedIn()) {
				$timeout(() => $state.go('communityHome'));
				deferred.reject();
			} else {
				deferred.resolve();
			}

			return deferred.promise;
		}

		const authenticateLoggedIn = () => {	// for pages only visible to logged in users
			const deferred = $q.defer();

			if (isLoggedIn()) {
				deferred.resolve();
			} else {
				$timeout(() => $state.go('login'));
				deferred.reject();
			}

			return deferred.promise;
		}

		const authenticateSiteAdmin = () => {	// for pages only visible to site admin
			const deferred = $q.defer();

			authenticateLoggedIn()
				.then(() => {
					return getCurrentUser();
				}, () => {
					return $q.reject();
				})
				.then((user)=> {
		    		if (user.isAdmin){
		    			deferred.resolve();
		    		} else {
		    			$timeout(() => $state.go('communityHome'));
						deferred.reject();
		    		}
		    	}, () => {
		    		deferred.reject();
		    	});

		    return deferred.promise;
		}

		const authenticateCurrentUserOrSiteAdmin = (userID) => {	// for pages only visible to current user or site admin
			const deferred = $q.defer();

			authenticateLoggedIn()
				.then(() => {
					return getCurrentUser();
				}, () => {
					return $q.reject();
				})
				.then((user)=> {
		    		if (user._id === userID || user.isAdmin){
		    			deferred.resolve();
		    		} else {
		    			$timeout(() => $state.go('communityHome'));
						deferred.reject();
		    		}
		    	}, () => {
		    		deferred.reject();
		    	});

			return deferred.promise;
		}

		const authenticateGroupAdminOrSiteAdmin = (groupHandle) => {	// for pages only visible to group admin or site admin
			const deferred = $q.defer();
			let currentUser = null;

			authenticateLoggedIn()
				.then(() => {
					return getCurrentUser();
				}, () => {
					return $q.reject();
				})
				.then((user)=> {
					currentUser = user;
		    		return GroupService.getOneGroup(groupHandle);
		    	}, () => {
		    		return $q.reject();
		    	})
		    	.then((group) => {
		    		if (group.admin.indexOf(currentUser._id) > -1 || currentUser.isAdmin){
		    			deferred.resolve();
		    		} else {
		    			$timeout(() => $state.go('communityHome'));
						deferred.reject();
		    		}
		    	}, () => {
		    		deferred.reject();
		    	});

			return deferred.promise;
		}

		const authenticatePostVisiblity = (groupHandle, postID) => {	// proper visibility of private posts; visible to group member and site admin
			const deferred = $q.defer();
			let selectedPost = {};

			PostService.getOnePost(postID)
				.then((post) => {
					selectedPost = post;

					if (selectedPost.showPublic){	// public posts are always visible
						deferred.resolve();
					} else if (isLoggedIn()) {	// if private post and logged in = check if group member
						return getCurrentUser();
					} else {	// if private posts and logged out
						return $q.reject();
					}
				}, () => {	// fail to load post
					return $q.reject();
				})
				.then((user) => {
					// only checks private posts
					if (!selectedPost.showPublic && (user.groupsJoined.indexOf(groupHandle) > -1 || user.isAdmin)){
						deferred.resolve();
					} else if (!selectedPost.showPublic) {
						$timeout(() => $state.go(`oneGroup`, {handle: groupHandle}));
						deferred.reject();
					}
				}, () => {	// fail to load current user
					$timeout(() => $state.go(`oneGroup`, {handle: groupHandle}));
					deferred.reject();
				})

			return deferred.promise;
		}

		return {
		  saveToken,
		  getToken,
		  logout,
		  isLoggedIn,
		  getCurrentUserID,
		  getCurrentUser,
		  register,
		  login,
		  allowAdminRegistration,
		  loginFirst,
		  authenticateLoggedOut,
		  authenticateLoggedIn,
		  authenticateSiteAdmin,
		  authenticateCurrentUserOrSiteAdmin,
		  authenticateGroupAdminOrSiteAdmin,
		  authenticatePostVisiblity
		};
	}

})();

