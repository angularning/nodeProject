var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');  //我是新引入的ejs插件

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getJueJin = require('./routes/getJuejin');
var getFrontendList = require('./routes/getFrontendList');
var getArticle = require('./routes/getArticle');
var getExcelList = require('./routes/getExcelList');
var getDouyin = require('./routes/getDouyin');

var app = express();

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  // //允许的header类型
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  // //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getJueJin', getJueJin);
app.use('/getDouyin', getDouyin);
app.use('/getFrontendList', getFrontendList);
app.use('/getArticle', getArticle);
app.use('/getExcelList', getExcelList);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
