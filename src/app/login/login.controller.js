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
			try {
				
				AuthService.login(self.user).then(function(msg) {
					//$state.go('index.main');
				}, function(errMsg) {
					console.log('Failed - ' + errMsg);
				});
			}
			finally {
				self.loading = false;
			}
		};
    }]);