var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/', (req, res)=>{
	
	req.session.email = null;
	res.redirect('/login');

});

module.exports = router;