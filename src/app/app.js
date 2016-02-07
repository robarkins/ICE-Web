'use strict';

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 
    'auth0', 'angular-storage', 'angular-jwt' ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            data: { pageTitle: 'Login' }
        })
        
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "components/common/content.html"
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "app/main/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "app/minor/minor.html",
            data: { pageTitle: 'Example view' }
        });

    $urlRouterProvider.otherwise('/login');
  })
  
  .config(function(authProvider) {
    authProvider.init({
        domain: 'rarkins.eu.auth0.com',
        clientID: 'LBYoocwsU8PTCmPbBkjkE6k55L3nAe8X'
    });
  })
  
  .run(function(auth) {
      auth.hookEvents();
  })
;
