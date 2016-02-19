var express = require('express');
var passport = require('passport');
var config = require('./config/database'); // get the db config file
var User = require('./models/user');
var Supplier = require('./models/supplier');
var jwt = require('jwt-simple');
var apiRoutes = express.Router();

apiRoutes.post('/authenticate', function(req, res) {
	User.findOne({
		email: req.body.email
	}, function(err, user) {
		if (err) throw err;
		
		if (!user) {
			//res.status(403).send({success: false, msg: 'Authentication failed! Invalid username or password.'});
			res.json({success: false, msg: 'Invalid username or password!'});
		} else {
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (isMatch && !err) {
					var claim = {
						iss: 'rarkins',
						iat: Math.round(+new Date()/1000),
						uid: user._id
					};
					var token = jwt.encode(claim, config.secret);
					res.status(200).json({success: true, msg: 'Bearer ' + token});
				} else {
					//res.status(403).send({success: false, msg: 'Authentication failed! Invalid username or password'});
					res.json({success: false, msg: 'Invalid username or password!'});
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

apiRoutes.get('/suppliers', function(req, res) {
	Supplier.find({}, function(err, suppliers) {
		if (err) throw err;
		console.log(suppliers);
	});
});

module.exports = apiRoutes;