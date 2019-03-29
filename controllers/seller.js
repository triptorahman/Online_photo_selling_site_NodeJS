var express = require('express');

var userModel = require.main.require('./model/user-model');
//var upload = require('express-fileupload');

var fs = require('fs');
  var path = require('path');
  var router = express.Router();







router.get('*', function(req, res, next){
		if(req.session.email != null){
			next();
		}else{
			res.redirect('/login');
		}
});










router.use('/assets',express.static('assets'));



router.get('/', (req, res)=>{
	
			
		userModel.getAdmin(req.session.email, function(result){

		if(result.length > 0){
			res.render('seller/sellerProfile', result[0]);
		}
	});
		
});	

router.get('/updatePhotoinfo', (req, res)=>{

	userModel.getsellerphoto(req.session.uid, function(result){

		if(result.length > 0){
			var user = {
				name: req.session.name,
				uList: result
			};
			res.render('seller/sellerUpdatePhotoInfo', user);
		}
	});	
});



router.get('/edit/:id', (req, res)=>{

	userModel.getphoto(req.params.id, function(result){
		if(result.length >0 ){
			res.render('seller/edit', result[0]);
		}else{
			res.redirect('/seller/updatePhotoinfo');
		}
	});
});

router.post('/edit/:id', (req, res)=>{
	
	var photo ={
		id: req.params.id,
		name : req.body.pname,
		type : req.body.ptype,
		description : req.body.pdescription,
		price:req.body.price
	};
	
	userModel.updatephoto(photo, function(success){
		if(success){
			res.redirect('/seller/updatePhotoinfo');
		}else{
			res.render("/seller/edit/"+req.params.id);
		}
	});
});


router.get('/uploadPhoto', function(request, response){
	
	
			response.render('seller/uploadPhoto');
		});

router.get('/uploadinformation', (req, res)=>{
		
		res.render('seller/sellerUpdateInfo');
});	






 

router.post('/uploadinformation/', function(request, response){


	var seller ={
		username : request.body.username,
		email : request.body.email,
		phone : request.body.phone,
		id: request.session.uid
		

};

userModel.sellerupdate(seller, function(success){
		if(success){
			
			response.redirect('/login');
			
		}else{
			response.render('seller/sellerUpdateInfo');
		}
	});



});

router.post('/uploadPhoto/', function(request, response){
/*var time = new Date().getTime(); 

	var Imgfile = request.files.image;
     var  Imgname = '/assets/uploads/' + time + Imgfile.name;*/
//moves the $file to $dir2
var moveFile = (file, dir2)=>{
  
  var f = path.basename(file);
  var dest = path.resolve(dir2, f);

  fs.rename(file, dest, (err)=>{
    if(err) throw err;
    else console.log('Successfully moved');
  });
};

//move file1.htm from 'test/' to 'test/dir_1/'


	

	var photo ={
		photoName : request.body.photoName,
		photoType : request.body.photoType,
		photoDescription : request.body.photoDescription,
		askingPrice : request.body.askingPrice,
		picture: request.body.image,
		id: request.session.uid
		

};

/*if(request.files.image){
  	

    var file = request.files.image,
      name1 = time + file.name,
      type1 = file.mimetype;
    var uploadpath = './assets/uploads/' + name1;
   
   file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name1,err);
       
      }
      else {
        console.log("Done",name1);


      }
    });
}*/
 
  
	
	userModel.tempUpload(photo, function(success){
		if(success){
			var  Imgname = './assets/source/' + photo.picture;

			moveFile(Imgname, './assets/uploads/');

			response.redirect('/seller');
		}else{
			response.render("/login");
		}
	});
});


router.get('/changepassword', (req, res)=>{
		
		res.render('seller/changePassword');
});	






 

router.post('/changepassword/', function(request, response){


	var seller ={
		
		
		password : request.body.password,
		id: request.session.uid
		

};

userModel.sellerchangepassword(seller, function(success){
		if(success){
			
			response.redirect('/seller');
			
		}else{
			response.render('seller/changePassword');
		}
	});



});

router.get('/delete/:id', (req, res)=>{

	userModel.getphoto(req.params.id, function(result){
		if(result.length >0 ){
			res.render('seller/delete', result[0]);
		}else{
			res.redirect('/seller/updatePhotoinfo');
		}
	});
});

router.post('/delete/:id', (req, res)=>{
	
	userModel.deletephoto(req.params.id, function(success){
		if(success){
			res.redirect('/seller/updatePhotoinfo');
		}else{
			res.redirect("/seller/delete/"+req.params.id);
		}
	});
});







module.exports = router;


