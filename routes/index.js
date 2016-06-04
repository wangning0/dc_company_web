var express = require('express');
var router = express.Router();
var db = require('../mongo/db');
var encrypt = require('../cryptoHash/encrypt');
var checkAuthor = require('./checkAuthor');
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
		if (err || doc.length == 0) {
			res.redirect('/admin/login');
		} else {
			req.session.username = req.body.username;
			console.log(req.body.username);
			res.redirect('/admin/index');
		}
	})
})
router.get('/admin/index', function(req, res, next) {
	checkAuthor(req, res);
	res.render('adminIndex', {
		username: req.session.username
	});
})
router.get('/adminArticle', function(req, res, next) {
	checkAuthor(req, res);
	res.render('postArticle', {
		username: req.session.username,
		newArticle: true
	});
})
router.get('/modifyArticle', function(req, res, next) {
	checkAuthor(req, res);
	res.render('postArticle', {
		username: req.session.username,
		newArticle: false
	})
})
router.post('/admin/article', function(req, res, next) {
	checkAuthor(req, res);
	console.log('re', req.body);
	var str = req.body.time.replace(/-/g, '/');
	var date = new Date(str);
	var time = date.getTime();
	var month = req.body.time.slice(5, 7);
	var day = req.body.time.slice(8);
	var _articleInfo = {
		year: req.body.time.slice(0, 4),
		timeDesc: time,
		title: req.body.title,
		time: req.body.time,
		article: req.body.article,
		author: req.body.author,
		month: month,
		day: day
	};
	db.postArticle(_articleInfo, function(err, doc) {
		console.log(err, doc);
		if (err) {
			res.send({
				status: 1,
				body: err
			});
		} else {
			res.status(200).send({
				status: 0,
				body: doc
			});
		}
	})
})
router.get('/admin/getAll', function(req, res, next) {
	checkAuthor(req, res);
	db.getAllArticle(function(err, docs) {
		if (err) {
			res.status(200).send({
				status: 1,
				body: err
			});
		} else {
			res.status(200).send({
				status: 0,
				body: docs
			});
		}
	})
});
router.get('/admin/getOneArticle', function(req, res, next) {
	var _id = req.query._id;
	var _info = {
		_id: _id
	}
	db.getOneArticle(_info, function(err, doc) {
		if (err) {
			res.status(200).send({
				status: 1,
				body: err
			});
		} else {
			res.status(200).send({
				status: 0,
				body: doc
			})
		}
	})
})
router.post('/admin/modifyArticle', function(req, res, next) {
	checkAuthor(req, res);
	console.log(req.body);
	var _info = {
		_id: req.body._id
	};
	/*str = str.replace(/-/g,'/');
	var date = new Date(str);
	var time = date.getTime();*/
	var str = req.body.time.replace(/-/g, '/');
	var date = new Date(str);
	var month = req.body.time.slice(5, 7);
	var day = req.body.time.slice(8);
	var time = date.getTime();
	var _articleInfo = {
		year: req.body.time.slice(0, 4),
		timeDesc: time,
		title: req.body.title,
		time: req.body.time,
		article: req.body.article,
		author: req.body.author,
		month: month,
		day: day
	};
	db.modifyArticle(_info, _articleInfo, function(err, doc) {
		if (err) {
			res.status(200).send({
				status: 1,
				body: err
			});
		} else {
			res.status(200).send({
				status: 0,
				body: doc
			})
		}
	})
})
router.get('/admin/deleteArticle', function(req, res, next) {
	checkAuthor(req, res);
	var _id = req.query._id;
	var _info = {
		_id: _id
	};
	db.deleteArticle(_info, function(err, doc) {
		if (err) {
			res.status(200).send({
				status: 1,
				body: err
			});
		} else {
			res.status(200).send({
				status: 0,
				body: doc
			});
		}
	})
});
router.get('/admin/getAllByYear', function(req, res, next) {
	db.getAllByYear(function(err, docs) {
		if (err) {
			res.status(200).send({
				status: 1,
				body: err
			});
		} else {
			res.status(200).send({
				status: 0,
				body: docs
			});
		}
	})
})
router.get('/article/detail', function(req, res, next) {
	res.render('articleDetail');
})
router.get('/modifyPasswd', function(req, res, next) {
	checkAuthor(req, res);
	res.render('modifyPasswd', {
		username: req.session.username
	})
})
router.post('/modifyPasswd', function(req, res, next) {
	checkAuthor(req, res);
	var info = {};
	info.passwd = encrypt.encrypt(req.body.passwd)
	db.modifyPasswd({
		username: 'admin'
	}, info, function(err, doc) {
		if (err) {
			res.status(200).send({
				status: 1,
				body: err
			});
		} else {
			res.status(200).send({
				status: 0
			});
		}
	})
})
router.get('/clearsession', function(req, res, next) {
	checkAuthor(req, res);
	req.session.username == null;
})
router.get('/admin/logout', function(req, res, next) {
	checkAuthor(req, res);
	req.session.username == null;
	res.redirect('/admin/login');
})
module.exports = router;