angular.module('iceWeb')
	
	.controller('SupplierCtrl', ['SupplierService', function(SupplierService) {
		var self = this;
		
		self.suppliers = SupplierService.getSuppliers();
	}]);