var dbModels = require('./dbModels');
var mongoose = require('mongoose');

module.exports = {
	openDb: function() {
		mongoose.connect('mongodb://localhost:27017/dc_company_web');
		mongoose.connection.on('open', function() {
			console.log('数据库连接成功');
		});
		mongoose.connection.on('error', function(err) {
			console.log('数据库连接失败:%s', err);
		})
	},
	checkUser: function(userInfo, cb) {
		var User = dbModels.getModel('user');
		User.findOne(userInfo, function(err, doc) {
			cb(err, doc);
		});
	},
	modifyUser: function(modifyInfo, cb) {
		var User = dbModels.getModel('user');
		User.create(modifyInfo, function(err, doc) {
			cb(err, doc);
		})
	},
	postArticle: function(articleInfo, cb) {
		var Article = dbModels.getModel('article');
		Article.create(articleInfo, function(err, doc) {
			cb(err, doc);
		})
	},
	getAllArticle: function(cb) {
		var Article = dbModels.getModel('article');
		/*Article.find({}, function(err, docs) {
			cb(err, docs);
		})*/
		Article.find({}).sort({
			'timeDesc': 'desc'
		}).exec(function(err, docs) {
			cb(err, docs);
		})
	},
	getOneArticle: function(articleInfo, cb) {
		var Article = dbModels.getModel('article');
		Article.find(articleInfo, function(err, doc) {
			cb(err, doc);
		})
	},
	deleteArticle: function(articleInfo, cb) {
		var Article = dbModels.getModel('article');
		Article.remove(articleInfo, function(err, docs) {
			cb(err, docs);
		})
	},
	getOneArticle: function(info, cb) {
		var Article = dbModels.getModel('article');
		Article.find(info, function(err, doc) {
			cb(err, doc);
		})
	},
	getAllByYear: function(cb) {
		var Article = dbModels.getModel('article');
		Article.find({}, function(err, docs) {
			if (err) {
				cb(err);
			} else {
				var docsObj = {};
				docs.forEach(function(item, index) {
					/*if (b[item.year]) {
						b[item.year].push(item);
					} else {
						b[item.year] = [item];
					}*/
					docsObj[item.year] ? docsObj[item.year].push(item) : docsObj[item.year] = [item]
				})
				cb(err, docsObj);
			}
		})
	},
	//PersonModel.update({_id:_id},{$set:{name:'MDragon'}},function(err){});
	modifyArticle: function(info, articleInfo, cb) {
		var Article = dbModels.getModel('article');
		Article.update(info, {
			$set: {
				"title": articleInfo.title,
				"time": articleInfo.time,
				"article": articleInfo.article,
				"year": articleInfo.year,
				"timeDesc": articleInfo.timeDesc,
				"author": articleInfo.author,
				"month": articleInfo.month,
				"day": articleInfo.day
			}
		}, function(err, doc) {
			cb(err, doc);
		});
	},
	modifyPasswd: function(userinfo, passwdinfo, cb) {
		var User = dbModels.getModel('user');
		User.update(userinfo, {
			$set: {
				"passwd": passwdinfo.passwd
			}
		}, function(err, doc) {
			cb(err, doc);
		});
	}
}