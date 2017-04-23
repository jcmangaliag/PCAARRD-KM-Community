(() => {
	'use strict';
	
	angular
		.module('users')
		.factory('UserAuthenticationService', UserAuthenticationService);

	UserAuthenticationService.$inject = ['$http', '$window', '$q', '$state'];

	function UserAuthenticationService ($http, $window, $q, $state) {

		const saveToken = (token) => {
		  $window.localStorage['pcaarrdcommunity-token'] = token;
		}

		const getToken = () => {
		  return $window.localStorage['pcaarrdcommunity-token'];
		}

		const logout = () => {
		  $window.localStorage.removeItem('pcaarrdcommunity-token');
		  $state.go("login");
		}

		const isLoggedIn = () => {
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

		const getCurrentUser = () => {
		  if(isLoggedIn()){
		    const token = getToken();
		    let payload = token.split('.')[1];
		    payload = $window.atob(payload);
		    payload = JSON.parse(payload);

		    return {
		    	_id: payload._id,
		      email : payload.email,
		      name : payload.name,
		      photo: payload.photo,
		      isAdmin: payload.isAdmin,
		      groupsJoined: payload.groupsJoined
		    };
		  }
		}

		const register = (userFormData, password, enteredAccessKey) => {
			const deferred = $q.defer();
			const requestBody = {userFormData, password};

			if (userFormData.isAdmin && !enteredAccessKey){
				deferred.reject({data: {message: 'Invalid Access Key!!'}});
				return deferred.promise;
			}
			else if (userFormData.isAdmin)
				requestBody.enteredKey = enteredAccessKey;

			$http.post('/api/users/register/', requestBody)
			.then(response => {
				saveToken(response.data.token);
		    	deferred.resolve(response.data.token);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const login = (userCredentials) => {
			const deferred = $q.defer();

			$http.post('/api/users/login/', userCredentials)
			.then(response => {
				saveToken(response.data.token);
				deferred.resolve(response.data.token);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const allowAdminRegistration = (enteredKey) => {
			const deferred = $q.defer();

			$http.post('api/users/allow-admin-registration', {enteredKey})
			.then((response) => {
				deferred.resolve(response.data.allow);
			}, (response) => {
				deferred.reject(response.data.allow);
			});

			return deferred.promise;
		}


		return {
		  saveToken,
		  getToken,
		  logout,
		  isLoggedIn,
		  getCurrentUser,
		  register,
		  login,
		  allowAdminRegistration
		};
	}

})();

