var JwtStrategy = require('passport-jwt').Strategy;

// Load User
var User = require('../models/user');
var config = require('./database');

module.exports = function(passport) {
	var options = {};
	options.secretOrKey = config.secret;
	passport.use(new JwtStrategy(options, function(jwt_payload, done) {
		User.findOne({id: jwt_payload.id}, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if(user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};