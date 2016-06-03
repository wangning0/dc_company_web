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
		Article.find({}, function(err, docs) {
			cb(err, docs);
		})
	},
	getOneArticle: function(articleInfo, cb) {
		var Article = dbModels.getModel('article');
		Article.find(articleInfo, function(err, doc) {
			cb(err, doc);
		})
	}
}