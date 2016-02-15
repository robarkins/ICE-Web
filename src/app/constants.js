angular.module('iceWeb')

    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated' 
    })
    
    .constant('API_ENDPOINT', {
        //url: 'http://localhost:5000/api',
		url: 'https://ice-web.herokuapp.com/api'
    });