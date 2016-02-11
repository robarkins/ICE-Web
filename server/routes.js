var express = require('express');
var passport = require('passport');
var config = require('./config/database'); // get the db config file
var User = require('./models/user');
var jwt = require('jwt-simple');
var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res) {
  res.render('src/index');
});

apiRoutes.post('/authenticate', function(req, res) {
	User.findOne({
		email: req.body.email
	}, function(err, user) {
		if (err) throw err;
		
		if (!user) {
			res.status(401).send({success: false, msg: 'Authentication failed! Invalid username or password.'});
		} else {
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (isMatch && !err) {
					var claim = {
						
					};
					var token = jwt.encode(user, config.secret);
					res.status(200).json({success: true, msg: 'JWT ' + token});
				} else {
					res.status(401).send({success: false, msg: 'Authentication failed! Invalid username or password'});
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

apiRoutes.get('/memberinfo', passport.authenticate('jwt', {session: false}), function(req, res) {
	console.log(req.headers);
	res.status(200).json({success: true, msg: 'Authenticated!'});
});

module.exports = apiRoutes;