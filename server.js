var express = require('express');
var app = express();
var jwt = require('express-jwt');


var authenticate = jwt({
  secret: new Buffer('mDCd0GyWig1pvFn9djP0L8gM5DrZp-y7M0KFfZ6w_qXyYDALNB80pjDE82mLemRq', 'base64'),
  audience: 'LBYoocwsU8PTCmPbBkjkE6k55L3nAe8X'
});


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

app.get('/', function(request, response) {
  response.render('src/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});