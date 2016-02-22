angular.module('iceWeb')

	.factory('SupplierService', ['$http', 'API_ENDPOINT', function($http, API_ENDPOINT) {
		return {
			get: function() {
                return $http.get(API_ENDPOINT.url + '/suppliers').then(function(res) {
                    return res.data;
                }, function(err) {
                    console.log('error');
                });
			}
		};
	}]);