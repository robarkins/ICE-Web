'use strict';

angular.module('iceWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 
    'angular-jwt', 'angular-ladda' ])
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
  
  .run(function($rootScope, $state){
	$rootScope.$state = $state;
  });
