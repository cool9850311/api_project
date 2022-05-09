const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const readRouter = require('./routes/crud/read');
const createRouter = require('./routes/crud/create');
const updateRouter = require('./routes/crud/update');
const deleteRouter = require('./routes/crud/delete');
const restockRouter = require('./routes/restock');
const sellRouter = require('./routes/sell');
const searchOrderRouter = require('./routes/searchOrder');
const updateOrderRouter = require('./routes/updateOrder');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/read', readRouter);
app.use('/create', createRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/restock', restockRouter);
app.use('/sell', sellRouter);
app.use('/searchOrder', searchOrderRouter);
app.use('/updateOrder', updateOrderRouter);
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
console.log('http://localhost:3000/');
module.exports = app;
