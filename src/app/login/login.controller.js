'use strict';

angular.module('inspinia')

    .controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location', function($scope, $http, auth, store, $location) {
        var self = this;
		
		self.demoLogin = function() {
			self.email = 'robarkins1987@gmail.com';
			self.password = 'kr1311gg';
			self.login();
		};
        
        self.login = function() {
            auth.signin({
				sso: false,
                username: self.email,
                password: self.password,
                connection: 'Username-Password-Authentication'
            }, function(profile, idToken, accessToken, state, refreshToken) {
                $location.path('/index/main');
            }, function(err) {
                console.log(err);
				alert('Incorrect username or password!');
            });
        };
    }])
    
 ;