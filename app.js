const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./models');

const indexRouter = require('./src/routes/index');
const postRouter = require('./src/routes/post');
const topicRouter = require('./src/routes/topic');
const musicRouter = require('./src/routes/music');
const emoteRouter = require('./src/routes/emotion');
const app = express();

const SECRET = process.env.SECRET;

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

const secret = process.env.SECRET;

app.use(logger('dev'));
app.use(express.json());
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/topic', topicRouter);
app.use('/music', musicRouter);
app.use('/emote', emoteRouter);

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

sequelize
  .sync({ alter: true })
  .then(() => console.log('connected database'))
  .catch((err) => console.error('occurred error in database connecting', err));

module.exports = app;
