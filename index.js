const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const createError = require('http-errors');
const path = require('path');

const app = express();

require('./db');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/payment', require('./routes/payment'));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/client/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build/index.html'));
//   })
// } else {
//   app.get('/', (req, res) => {
//     res.send('Hello Back end! server is running correctly.');
//   });
// }

app.get("/", (req, res) => {
  res.send('Hello Back end! server is running correctly.');
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

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
