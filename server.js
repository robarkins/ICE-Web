var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./server/config/database');
var User = require('./server/models/user');
var port = process.env.PORT || 3000;
var jwt = require('jwt-simple');
var apiRoutes = require('./server/routes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(passport.initialize());

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./server/config/passport')(passport);

app.use(express.static(__dirname + '/dist'));

app.use('/api', apiRoutes);

app.listen(port, function() {
  console.log('Node app is running on port', port);
});