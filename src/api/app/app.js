var express = require('express');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hello = require('./routes/hello');
var linebot = require('./routes/linebot');
var workshopManage = require('./routes/workshopManage');
var account = require('./routes/account');
var product = require('./routes/product');
var workshop = require('./routes/workshop');
var cart = require('./routes/cart');

var session = require('express-session');
var app = express();

var session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(session_opt));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', hello);
app.use('/linebot', linebot);
app.use('/workshopManage', workshopManage);
app.use('/account' , account);
app.use('/product' , product);
app.use('/workshop' , workshop);
app.use('/cart' , cart);

// Crossを有効
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

// Optionsも必要
app.options('*', (req, res) => {
  res.sendStatus(200);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;