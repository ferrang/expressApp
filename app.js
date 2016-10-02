var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var compression = require("compression");
var io = require("socket.io");
var helmet = require("helmet");
var cookieSession = require('cookie-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var live = require('./routes/live');

var app = express();

// Cookie session setup
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(compression());

// All possible routes are here
app.use((req, res, next) => {
  console.log("Req cookies:", req.cookies);
  if(req.session) {
    req.session.views = (req.session.views || 0) + 1;
    console.log("User got here", req.session.views, "times");
  }
  next();
});
app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);
app.use('/live', live);

// If we've got here, just catch 404 and forward to error handler
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
