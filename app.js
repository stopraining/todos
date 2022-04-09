var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
//passport
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
var session = require('express-session');

const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let ejs = require('ejs-locals'); //ejs

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


//ejs
app.engine('ejs', ejs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false, // not stored in store and cookie if not logged in yet
  cookie: { maxAge: 600000 }
}))

//passport
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/passport')(passport)

// set up connect-flash
app.use(flash())

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//先放在這裡測試
// passport.use(new LocalStrategy(
//   function (username, password, done) {
//     console.log(username + ' ; ' + password)
//     var user = { username: username };
//     return done(null, user);
//   }
// ));

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (id, done) {
//   done(null, id)
// });


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
