var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var routes = require('./routes/index');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var ueditor = require('ueditor');

var db = require('./mongo/db');
db.openDb();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/lib/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
  // ueditor 客户发起上传图片请求
  if (req.query.action === 'uploadimage') {
    var foo = req.ueditor;
    var date = new Date();
    var imgname = req.ueditor.filename;
    //console.log(req.ueditor.filename);
    var img_url = '/lib/ueditor/image';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
    var dir_url = '/lib/ueditor/image';
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {

    res.setHeader('Content-Type', 'application/json');
    res.redirect('/lib/ueditor/config.json')
  }
}));

app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 10
  },
  resave: true,
  saveUninitialized: true,
  secret: 'dc',
  key: 'dc',
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;