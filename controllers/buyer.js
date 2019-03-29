var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();


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
	userModel.getAdmin(req.session.email, function(result){

		if(result.length > 0){
			res.render('buyer/buyerProfile', result[0]);
		}
	});

		
		
});	
router.get('/buyerupdateinfo', (req, res)=>{
		
		res.render('buyer/buyerupdateinfo');
});

router.post('/buyerupdateinfo/', function(request, response){


	var seller ={
		username : request.body.username,
		email : request.body.email,
		phone : request.body.phone,
		id: request.session.uid
		

};

userModel.sellerupdate(seller, function(success){
		if(success){
			
			response.redirect('/buyer');
			
		}else{
			response.render('buyer/buyerupdateinfo');
		}
	});



});
router.get('/changepassword', (req, res)=>{
		
		res.render('buyer/changePassword');
});	






 

router.post('/changepassword/', function(request, response){


	var seller ={
		
		
		password : request.body.password,
		id: request.session.uid
		

};

userModel.sellerchangepassword(seller, function(success){
		if(success){
			
			response.redirect('/login');
			
		}else{
			response.render('buyer/changePassword');
		}
	});



});


router.get('/requestcredit', (req, res)=>{
		
		res.render('buyer/requestCredit');
});	


router.post('/requestcredit', function(request, response){
	
	var credit ={
		id : request.session.uid,
		email : request.body.email,
		balance: request.body.credit
		

	};
	
	
	userModel.creditrequest(credit, function(success){
		if(success){
			//console.log(request.session.email);
			response.redirect('/buyer');
		}else{
			response.render('buyer/requestCredit');
		}
	});
});

router.get('/buyphoto', (req, res)=>{

	userModel.getallfinalphoto(function(result){

		if(result.length > 0){
			var photo = {
				//name: req.session.name,
				uList: result
			};
			res.render('buyer/PhotoInfo', photo);
		}
	});	
});

router.get('/confirmbuy/:id', (req, res)=>{

	userModel.getfinalphoto(req.params.id, function(result){
		if(result.length >0 ){
			res.render('buyer/confirmbuy', result[0]);
		}else{
			res.redirect('/buyer/PhotoInfo');
		}
	});
});

router.post('/confirmbuy/:id', (req, res)=>{
	
	var photo = {
				sellerid: req.body.sellerid,
				price: req.body.price,
				photoid:req.body.pid,
				buyerid: req.session.uid
			};

	userModel.getbalance(photo.sellerid, function(result){
		if(result.length >0 ){
			var x=result[0].balance;
			var z=parseInt(x);
			var y=parseInt(req.body.price);
   var sellerbalance=x+y;

   userModel.getbalance(photo.buyerid, function(result){
   	if(result.length >0 ){
			var a=result[0].balance;
			var b=parseInt(a);
			var c=y;
   var buyerbalance=a-c;
   var user = {
				id1: photo.sellerid,
				balanceseller: sellerbalance,
				balancebuyer:buyerbalance,
				id2:photo.buyerid

			};

			userModel.updatesellerBalance(user, function(success){
		if(success){

			userModel.updatebuyerBalance(user, function(success){
			
			if(success){
			res.redirect('/buyer/buyphoto');}
			else{
				res.redirect("/buyer/confirmbuy/"+req.params.id);
			}
			});
		}else{
			res.redirect("/buyer/confirmbuy/"+req.params.id);
		}
	});
		}
		else{
			res.redirect("/buyer/confirmbuy/"+req.params.id);
		}

   });
	
			
			//console.log(user.balance);
	
	



			

		}else{
			res.redirect('/buyer/PhotoInfo');
		}
	});

});



module.exports = router;