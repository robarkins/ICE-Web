var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./server/config/database');
var User = require('./server/models/user');
var jwt = require('express-jwt');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));


mongoose.connect(config.database);

var authenticate = jwt({
  secret: new Buffer('mDCd0GyWig1pvFn9djP0L8gM5DrZp-y7M0KFfZ6w_qXyYDALNB80pjDE82mLemRq', 'base64'),
  audience: 'LBYoocwsU8PTCmPbBkjkE6k55L3nAe8X'
});


app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/dist'));

app.get('/', function(request, response) {
  response.render('src/index');
});

app.post('/register', function(request, response) {
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});