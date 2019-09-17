/* 	init EXPRESS.JS AND MIDDLEWARE*/
var express = require('express');
var app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
//const sassMiddleware = require('node-sass-middleware');
const genuuid = require('uuid/v1');
const config = require('../config/config');

/**
 * VIEW INIT
 */
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'twig');
/**
 * HTTP MIDDLEWARE INIT
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
	next();
});

app.use(session({
	secret: config.session.secret,
	genid: function (req) {
		return genuuid();
	},
	resave: false,
	saveUninitialized: true,
	cookie: {secure: true}
}));

app.use(express.static(path.join(__dirname, '../static_public')));
module.exports = app;