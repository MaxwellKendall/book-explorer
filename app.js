var express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const app = express();
const config = require('./config');
const testController = require('./controllers/testController');
const processAuth = require('./auth');

var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
mongoose.connect(config.getDbConnectionString());
app.use('/', express.static(__dirname + '/public'));
app.use(session({ secret: 'SQRLE', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy(config.fbAuth, processAuth));

testController(app);
app.listen(port);
