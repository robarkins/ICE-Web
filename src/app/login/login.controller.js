'use strict';

angular.module('iceWeb')

    .controller('LoginCtrl', ['AuthService', '$state', 'SweetAlert', function(AuthService, $state, SweetAlert) {
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
				self.loading = false;
				SweetAlert.swal('Sorry', 'The username or password you entered is invalid. Please try again.', 'error');
			});
		};
    }]);