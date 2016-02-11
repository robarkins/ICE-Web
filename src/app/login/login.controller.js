'use strict';

angular.module('inspinia')

    .controller('LoginCtrl', ['$timeout', function($timeout) {
        var self = this;
			
		self.runLoadingDemo = function() {
			// start loading
			self.loading = true;
			$timeout(function(){
				// Simulate some service
				self.loading = false;
			},2000);
		};
    }]);