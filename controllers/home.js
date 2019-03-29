var express = require('express');
var userModel = require.main.require('./model/user-model');
var fs = require('fs');
  var path = require('path');
var router = express.Router();
//var session = require('express-session');

router.use('/assets',express.static('assets'));


router.get('*', function(req, res, next){
		if(req.session.email != null){
			next();
		}else{
			res.redirect('/login');
		}

		//console.log(req.session.email);
});

router.get('/', (req, res)=>{

		//req.session.email
userModel.getAdmin(req.session.email, function(result){

		if(result.length > 0){
			res.render('home/adminProfile', result[0]);
		}
	});

		
});
		



router.get('/changePassword', (req, res)=>{
	
	res.render('home/changePassword');
});
	


router.post('/changePassword', (req, res)=>{
		
		var user={

			password  : req.body.password,
			cpassword :req.body.cpassword
			




		};
		if(req.body.password==req.body.cpassword)
		{userModel.updateAdminPassword(user,function(success){


			if(success){
				res.redirect('/login');
			
		}else{
			res.redirect("/home");
		}

			
		});

		}



	else{

			res.redirect('/home');



		}
		

		




});



			
		
			

		
		

router.get('/userUpdateInfo', (req, res)=>{
		
		res.render('home/userUpdateInfo');
});	
router.get('/adminUpdate', (req, res)=>{
		
		res.render('home/adminUpdate');
});

router.post('/adminUpdate', (req, res)=>{
		
		var user={

			name  : req.body.adminName,
			email :req.body.adminEmail,
			phone :req.body.adminPhone




		};
		userModel.updateAdmin(user,function(success){


			if(success){
			res.redirect('/login');
		}else{
			res.render("/home/adminUpdate/"+req.params.id);
		}

			
		});




});



router.get('/userUpdateInfo', (req, res)=>{
		
		res.render('home/userUpdateInfo');
});


router.get('/userlist', (req, res)=>{
	
	
	userModel.getAll(function(results){
		if(results.length > 0){
			
			var user = {
				name: req.session.name,
				uList: results
			};
			res.render('home/userlist', user);
		}
	});	
});
router.get('/userUpdateInfo/:id', (req, res)=>{
			//console.log(req.params.id);
	userModel.get(req.params.id, function(result){
		//console.log(result[0].uid);
		if(result.length >0 ){
			
			res.render('home/userUpdateInfo', result[0]);
		}else{
			res.redirect('/home/userlist');
		}
	});
});	
router.post('/userUpdateInfo/:id', (req, res)=>{
	
	var user ={
		id: req.params.id,
		uname : req.body.username,
		email : req.body.email,
		phone : req.body.phone

	};

	//console.log(user.uname);
	
	userModel.update(user, function(success){
		console.log(user.uname);
		if(success){
			res.redirect('/home/userlist');
		}else{
			res.render("/home/userUpdateInfo/"+req.params.id);
		}
	});
});



router.get('/delete/:id', (req, res)=>{

	userModel.get(req.params.id, function(result){
		if(result.length >0 ){
			res.render('home/delete', result[0]);
		}else{
			res.redirect('/home/userlist');
		}
	});
});	

router.post('/delete/:id', (req, res)=>{
	
	userModel.delete(req.params.id, function(success){
		if(success){
			res.redirect('/home/userlist');
		}else{
			res.redirect("/home/delete/"+req.params.id);
		}
	});
});
//confirm photo
router.get('/confirmPhoto', (req, res)=>{

	userModel.getallphoto(function(result){

		if(result.length > 0){
			var photo = {
				//name: req.session.name,
				uList: result
			};
			res.render('home/PhotoInfo', photo);
		}
	});	
});


router.get('/submitphoto/:id', (req, res)=>{

	userModel.getphoto(req.params.id, function(result){
		if(result.length >0 ){
			res.render('home/submitPhoto', result[0]);
		}else{
			res.redirect('/home/Photoinfo');
		}
	});
});



//rest of submit photo
router.post('/submitphoto/:id', (req, res)=>{

//move photo
	var moveFile = (file, dir2)=>{
  
  var f = path.basename(file);
  var dest = path.resolve(dir2, f);

  fs.rename(file, dest, (err)=>{
    if(err) throw err;
    else console.log('Successfully moved');
  });
};
	
	var photo ={
		id: req.params.id,
		name : req.body.pname,
		type : req.body.ptype,
		description : req.body.pdescription,
		price:req.body.price,
		image:req.body.imagename,
		uid:req.body.userid
	};
	
	userModel.insertfinalphoto(photo, function(success){
		if(success){

			var  Imgname = './assets/uploads/' + photo.image;

			moveFile(Imgname, './assets/server/');

			userModel.deletephoto(req.params.id, function(success){
		if(success){
			res.redirect('/home/confirmPhoto');
		}else{
			res.redirect("/home/submitphoto/"+req.params.id);
		}
	});

			
		}else{
			res.render("/home/submitphoto/"+req.params.id);
		}
	});

});
//credit list

router.get('/creditrequestlist', (req, res)=>{

	userModel.getallcreditlist(function(result){

		if(result.length > 0){
			var creditlist = {
				//name: req.session.name,
				uList: result
			};
			res.render('home/creditRequestlist', creditlist);
		}
	});	
});

router.get('/confirmbalance/:id', (req, res)=>{

	userModel.getonecreditlist(req.params.id, function(result){
		if(result.length >0 ){
			res.render('home/confirmBalance', result[0]);
		}else{
			res.redirect('/home/creditRequestlist');
		}
	});
});
router.post('/confirmbalance/:id', (req, res)=>{
   
userModel.getbalance(req.params.id, function(result){
		if(result.length >0 ){
			var x=result[0].balance;
			var z=parseInt(x);
			var y=parseInt(req.body.balance);
   var newbalance=x+y;
	var user = {
				id: req.params.id,
				balance: newbalance
			};
			
			//console.log(user.balance);
	
	userModel.updateBalance(user, function(success){
		if(success){
			userModel.deletefromcreditlist(user, function(success){
			if(success){
			res.redirect('/home/userlist');}
			else{
				res.redirect("/home/confirmbalance/"+req.params.id);
			}
			});
		}else{
			res.redirect("/home/confirmbalance/"+req.params.id);
		}
	});



			

		}else{
			res.redirect('/home/creditRequestlist');
		}
	});

 
   
});


module.exports = router;