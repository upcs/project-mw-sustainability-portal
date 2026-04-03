var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var indivRouter = require('./routes/indivProj');
var newProjRouter = require('./routes/newProj');
var uploadRouter = require('./routes/upload');
var loginRouter = require('./routes/mylogin');
var uploadProjRouter = require('./routes/upload_new_proj');
//var uploadRouter = require('./routes/upload');
var loginRouter = require('./routes/mylogin');
var renderProjRouter = require('./routes/render_project');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/indivProj', indivRouter);
//app.use('/upload',uploadRouter);
app.use('/mylogin', loginRouter);
app.use('/newProj', newProjRouter);
app.use('/upload_new_proj', uploadProjRouter);
app.use('/render_project', renderProjRouter);

app.post('/submit', (req, res) => {
    console.log(req.body); // Access parsed data
    res.send('Data received');
});

app.post('/register', (req, res) => {
    console.log(req.body); // Access parsed data
    res.send('Data received');
});

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
