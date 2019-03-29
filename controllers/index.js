var express = require('express');
var bodyParser 		= require('body-parser');
var userModel = require.main.require('./model/user-model');
var router = express.Router();
var session = require('express-session');


router.use('/assets',express.static('assets'));





router.get('/', function(request, response){
	
		response.render('index/index');
	});


router.get('/signup', function(request, response){
	
	
			response.render('index/signup');
		});

router.post('/signup', function(request, response){
	
	var user ={
		username : request.body.username,
		password : request.body.password,
		email : request.body.email,
		phonenumber : request.body.phonenumber,
		balance: 0,
		type: request.body.usertype

	};
	
	
	userModel.insert(user, function(success){
		if(success){
			//console.log(request.session.email);
			response.redirect('/login');
		}else{
			response.render("/login");
		}
	});
});

router.get('/forgot', function(request, response){
	
	
			response.render('index/forgot');
		});






module.exports = router;

