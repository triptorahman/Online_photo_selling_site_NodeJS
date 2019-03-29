//DECLARATION
var express 		= require('express');
var bodyParser 		= require('body-parser');
//var fileupload=require('express-fileupload');
var login			= require('./controllers/login');
var home			= require('./controllers/home');
var seller = require('./controllers/seller');

var logout			= require('./controllers/logout');
var index 			= require('./controllers/index');
var app  			= express();
var session = require('express-session');
var buyer=require('./controllers/buyer');
//var upload = require('express-fileupload');


var port 			= 3000;


//CONFIGURATION
app.set('view engine', 'ejs');


//MIDDLEWARES
app.use(session({secret: 'my top secret code', saveUninitialized: true, resave: false}));
app.use(bodyParser.urlencoded({extended: false}));
//app.use(upload());
//app.use(cookieParser());
//app.use('/login', login);
//app.use('/home', home);
app.use('/logout', logout);
app.use('/assets', express.static('assets'));

//ROUTES
app.use('/', index);

app.use('/index', index);
app.use('/signup', index);
app.use('/login', login);
app.use('/forgot', index);
app.use('/home', home);
app.use('/seller', seller);

app.use('/buyer', buyer);
app.use('/home/userUpdateInfo/', home);

/*app.get('/setCookie', (req,res)=>{
	res.cookie('cookie1', 'first cookie');
	res.send("done");
});

app.get('/viewCookie', (req,res)=>{
	res.send(req.cookies['cookie1']);
});

app.get('/rmCookie', (req,res)=>{
	res.clearCookie('cookie1');
	res.send('Done');
});*/


//SERVER STARTUP
app.listen(port, ()=>console.log('server started at'+port+"..."));