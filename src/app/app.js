'use strict';

angular.module('iceWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 
    'angular-jwt', 'angular-ladda', 'ngStorage', 'oitozero.ngSweetAlert' ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        })
        
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "components/common/content.html"
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "app/main/main.html",
            data: { requiresLogin: true, pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "app/minor/minor.html",
            data: { pageTitle: 'Example view' }
        });

    $urlRouterProvider.otherwise('/login');
  })
  
  .config(function($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
  })
  
  .run(function($rootScope, $state, AuthService, AUTH_EVENTS){
	$rootScope.$state = $state;
	
	$rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {
		if (!AuthService.isAuthenticated()) {
			if (next.name !== 'login') {
				event.preventDefault();
				$state.go('login');
			}
		}
	});
  });
