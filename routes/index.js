var express = require('express');
var router = express.Router();
var db = require('../mongo/db');
var encrypt = require('../cryptoHash/encrypt');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/admin/login', function(req, res, next) {
	res.render('login');
});

router.post('/admin/login', function(req, res, next) {
	var infoObj = {};
	infoObj.username = req.body.username;
	infoObj.passwd = encrypt.encrypt(req.body.passwd);
	console.log('req.body', req.body);
	db.checkUser(infoObj, function(err, doc) {
		console.log('doc', doc);
		doc = doc ? doc : [];
		console.log(doc, 'doc');
		if (err) {
			res.redirect('/admin/login');
		} else {
			res.send('ok');
		}
	})
})
router.post('/admin/article', function(req, res, next) {
	console.log('re', req.body);
	db.postArticle(req.body, function(err, doc) {
		console.log(err, doc);
		if (err) {
			res.send(err);
		} else {
			res.status(200).send(doc);
		}
	})
})
router.get('/admin/getAll', function(req, res, next) {
	db.getAllArticle(function(err, docs) {
		res.status(200).send(docs);
	})
})
module.exports = router;