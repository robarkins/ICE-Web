angular.module('iceWeb')

	.factory('SupplierService', [function() {
		return {
			getSuppliers: function() {
				return [
					{
						firstName: 'Robert',
						surname: 'Arkins',
						address: {
							line1: '23 Kennington Close',
							line2: 'Templeogue',
							line3: 'Dublin 6W',
							line4: 'Ireland'
						}
					},
					{
						firstName: 'Siga',
						surname: 'Jasiute',
						address: {
							line1: 'Apt 13',
							line2: '97 Reuben Street',
							line3: 'Rialto',
							line4: 'Dublin 8'
						}
					}
				];
			}
		};
	}]);