var db = require('./db');

module.exports={

	
	getAll: function(callback){
		var sql = "select * from infotable where type != 3";
		db.getResult(sql, function(results){
			callback(results);
		});
	},
	get: function(userId, callback){
		var sql = "select * from infotable where uid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	updateAdminPassword: function(user, callback){
		var sql = "update infotable set password='"+user.password+"' where type = 3 ";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getProfile: function(userEmail, callback){
		var sql = "select * from user where email=?";

		db.getResult(sql, [userEmail], function(result){
			callback(result);
		});
	},
	getAdmin: function(user, callback){
		console.log(user);
		var sql = "select * from infotable where email='"+user+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getSign: function(userEmail, callback){
		console.log(userEmail);
		var sql = "select * from infotable where email='"+userEmail+"' ";
		console.log(123456);
		db.getResult(sql, function(result){
			callback(result);
		});
	},
	updateAdmin: function(user, callback){
		var sql = "update infotable set username='"+user.name+"', email='"+user.email+"', phone='"+user.phone+"' where type = 3 ";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	validate: function(user, callback){
		var sql = "select * from infotable where email='"+user.email+"' and password='"+user.password+"'";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	insert: function(user, callback){
		var sql = "insert into infotable values (null, '"+user.username+"','"+user.password+"','"+user.email+"','"+user.phonenumber+"','"+user.balance+"','"+user.type+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "update infotable set username='"+user.uname+"', email='"+user.email+"', phone='"+user.phone+"' where uid="+user.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(userId, callback){
		var sql = "delete from infotable where uid="+userId;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	
	tempUpload: function(photo, callback){
		var sql = "insert into tempupload values (null, '"+photo.photoName+"','"+photo.photoType+"','"+photo.photoDescription+"','"+photo.askingPrice+"','"+photo.picture+"','"+photo.id+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	sellerupdate: function(seller, callback){
		var sql = "update infotable set username='"+seller.username+"', email='"+seller.email+"', phone='"+seller.phone+"' where uid="+seller.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getsellerphoto: function(userId, callback){
		var sql = "select * from tempupload where uid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	updatephoto: function(photo, callback){
		var sql = "update tempupload set photoName='"+photo.name+"', photoType='"+photo.type+"', photoDescription='"+photo.description+"', askingPrice='"+photo.price+"' where pid="+photo.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	sellerchangepassword: function(seller, callback){
		var sql = "update infotable set password='"+seller.password+"' where uid="+seller.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	deletephoto: function(userId, callback){
		var sql = "delete from tempupload where pid="+userId;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getallphoto: function(callback){
		var sql = "select * from tempupload";

		db.getResult(sql, function(result){
			callback(result);
		});
	},

//made by tripto for home controller credit req
	creditrequest: function(credit, callback){
		var sql = "insert into creditrequest values ('"+credit.id+"','"+credit.email+"','"+credit.balance+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getallcreditlist: function(callback){
		var sql = "select * from creditrequest";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getonecreditlist: function(userId, callback){
		var sql = "select * from creditrequest where uid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	updateBalance: function(user, callback){
		var sql = "update infotable set balance='"+user.balance+"' where uid="+user.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	deletefromcreditlist: function(user, callback){
		var sql = "delete from creditrequest where uid="+user.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getbalance: function(userId, callback){
		var sql = "select * from infotable where uid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	//final photo
	insertfinalphoto: function(photo, callback){
		var sql = "insert into phototable values ('"+photo.id+"', '"+photo.name+"','"+photo.type+"','"+photo.description+"','"+photo.price+"','"+photo.image+"','"+photo.uid+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	//buyer part
	getallfinalphoto: function(callback){
		var sql = "select * from phototable";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getfinalphoto: function(userId, callback){
		var sql = "select * from phototable where pid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	updatesellerBalance: function(user, callback){
		var sql = "update infotable set balance='"+user.balanceseller+"' where uid="+user.id1;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	updatebuyerBalance: function(user, callback){
		var sql = "update infotable set balance='"+user.balancebuyer+"' where uid="+user.id2;
		db.execute(sql, function(status){
			callback(status);
		});
	},

	
	getphoto: function(userId, callback){
		var sql = "select * from tempupload where pid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	}
}



