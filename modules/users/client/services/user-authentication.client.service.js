(() => {
	'use strict';
	
	angular
		.module('users')
		.factory('UserAuthenticationService', UserAuthenticationService);

	UserAuthenticationService.$inject = ['$http', '$window', '$q', 'ngToast', '$state'];

	function UserAuthenticationService ($http, $window, $q, ngToast, $state) {

		const saveToken = (token) => {
		  $window.localStorage['pcaarrdcommunity-token'] = token;
		}

		const getToken = () => {
		  return $window.localStorage['pcaarrdcommunity-token'];
		}

		const logout = () => {
		  $window.localStorage.removeItem('pcaarrdcommunity-token');
		  $state.go("communityFeed");
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

		const getCurrentUser = () => {	// MOVE THIS TO USER SERVICE
		  if(isLoggedIn()){
		    const token = getToken();
		    let payload = token.split('.')[1];
		    payload = $window.atob(payload);
		    payload = JSON.parse(payload);

		    return {
		      email : payload.email,
		      name : payload.name,
		      isAdmin: payload.isAdmin
		    };
		  }
		}

		const register = (userFormData, password) => {
			const deferred = $q.defer();

			$http.post('/api/users/register/', {userFormData, password})
			.then(response => {
				saveToken(response.data.token);

				ngToast.create({
		    		className: 'success',
		    		content: `User was successfully registered.`
		    	});

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


		return {
		  saveToken,
		  getToken,
		  logout,
		  isLoggedIn,
		  getCurrentUser,
		  register,
		  login
		};
	}

})();

