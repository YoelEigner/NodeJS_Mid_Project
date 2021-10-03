var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var searchRouter = require('./routes/searchMovie');
var createRouter = require('./routes/newMovie');
var resultsRouter = require('./routes/results');
var logoutRouter = require('./routes/logout');
var mgmtRouter = require('./routes/usermgmt');

const session = require('express-session');

var app = express();
app.use(session({secret : 'mysecret'}))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/home', usersRouter);
app.use('/login', loginRouter);
app.use('/search', searchRouter);
app.use('/newmovie', createRouter);
app.use('/results', resultsRouter);
app.use('/logout', logoutRouter);
app.use('/usermgmt', mgmtRouter);

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
