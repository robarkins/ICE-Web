angular.module('iceWeb')
	
	.controller('SupplierCtrl', ['SupplierService', function(SupplierService) {
		var self = this;

		SupplierService.get().then(function(data) {
            self.suppliers = data;
        }, function(err) {
            console.error('Error: ' + err);
        });
	}]);