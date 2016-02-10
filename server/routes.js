var express = require('express');
var config = require('./config/database'); // get the db config file
var User = require('./models/user');
var jwt = require('jwt-simple');
var apiRoutes = express.Router();

apiRoutes.get('/', function(request, response) {
  response.render('src/index');
});

apiRoutes.post('/authenticate', function(request, response) {
	User.findOne({
		email: request.body.email
	}, function(err, user) {
		if (err) throw err;
		
		if (!user) {
			response.send({success: false, msg: 'Authentication failed! Invalid username or password.'});
		} else {
			user.comparePassword(request.body.password, function(err, isMatch) {
				if (isMatch && !err) {
					var token = jwt.encode(user, config.secret);
					response.json({success: true, msg: 'JWT ' + token});
				} else {
					response.send({success: false, msg: 'Authentication failed! Invalid username or password'});
				}
			});
		}
	});
});

apiRoutes.post('/register', function(request, response) {
	if (!request.body.email || !request.body.password) {
		response.json({success: false, msg: 'You must pass an email address and password!'});
	} else {
		var newUser = new User({
			email: request.body.email,
			password: request.body.password
		});
		
		newUser.save(function(err) {
			if(err) {
				return response.json({success: false, msg: 'Username already exists!'});
			}
			response.json({success: true, msg: 'Successfully created new user.'});
		});
	}
});

module.exports = apiRoutes;