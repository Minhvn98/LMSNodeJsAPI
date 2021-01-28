const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const db = require('../config/db');

const courseRouter = require('./routes/course.route');
const teacherRouter = require('./routes/teacher.route');
const lessonRouter = require('./routes/lesson.route');

dotenv.config();
db.connect();

const app = express();
const port = process.env.PORT ?? 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// App routing
app.use('/courses', courseRouter);
app.use('/teachers', teacherRouter);
app.use('/lessons', lessonRouter);

// app.use('/', (req, res, next) => {
//   return res.status(200).json({
//     message: 'OK'
//   })
// });
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

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
