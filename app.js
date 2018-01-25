var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var testController = require('./controllers/testController');

var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
testController(app);

app.listen(port);
