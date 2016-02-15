'use strict';

angular.module('iceWeb')

    .controller('LoginCtrl', ['$timeout', 'AuthService', '$state', function($timeout, AuthService, $state) {
        var self = this;
		
		self.user = {
			email: 'robarkins1987@gmail.com',
			password: 'kr1311gg'
		};
		
		self.login = function() {
			self.loading = true;
			AuthService.login(self.user).then(function(msg) {
				$state.go('index.main');
				self.loading = false;
			}, function(errMsg) {
				console.log('Login failed - ' + errMsg);
				self.loading = false;
			});
		};
    }]);