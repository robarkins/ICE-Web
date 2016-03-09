angular.module('iceWeb')
	
	.controller('SupplierCtrl', ['SupplierService', 'DTOptionsBuilder', function(SupplierService, DTOptionsBuilder) {
		var self = this;
        
         self.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            'csvHtml5',
			'excelHtml5',
            'pdfHtml5',
            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

		SupplierService.get().then(function(data) {
            self.suppliers = data;
        }, function(err) {
            console.error('Error: ' + err);
        });
	}]);