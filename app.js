const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
require('./components/category/Model');
require('./components/product/Model');
require('./components/user/Model');

const indexRouter = require('./routes/index');
const userCpanelRouter = require('./routes/cpanel/user');
const productCpanelRouter = require('./routes/cpanel/product');
const userAPIRouter = require('./routes/api/user');
const productAPIRouter = require('./routes/api/product');

// const acreageRouter = require('./routes/acreage');
// const perimeterRouter = require('./routes/perimeter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Khai báo thông tin session, cookie
app.use(
	session({
		secret: 'iloveyou',
		resave: true,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);
// Khai báo cors
app.use(cors());

mongoose
	.connect(
		'mongodb://127.0.0.1:27017/BackEnd?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
	.catch((err) => console.log('>>>>>>>>> DB Error: ', err));

// http://localhost:3000/
app.use('/', indexRouter);
// http://localhost:3000/cpanel/users
app.use('/cpanel/users', userCpanelRouter);
// http://localhost:3000/cpanel/products
app.use('/cpanel/products', productCpanelRouter);
// http://localhost:3000/api/users
app.use('/api/users', userAPIRouter);
// http://localhost:3000/cpanel/products
app.use('/api/products', productAPIRouter);

// http://localhost:3000/dien-tich
// app.use('/dien-tich', acreageRouter);
// http://localhost:3000/chu-vi
// app.use('/chu-vi', perimeterRouter);

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

// http://localhost:3000/
