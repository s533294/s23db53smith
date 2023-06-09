var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Car = require("./models/car")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carRouter = require('./routes/car');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});

var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});


async function recreateDB(){
  await Car.deleteMany();
  let instance1 = new Car({
    color: 'Red',
    make: 'Toyota',
    model: 'Camry',
    style: 'Sedan',
    price: 10000
  });
  let instance2 = new Car({
    color: 'White',
    make: 'Acura',
    model: 'TL',
    style: 'Sedan',
    price: 25000
  });
  let instance3 = new Car({
    color: 'Black',
    make: 'Ford',
    model: 'F-150',
    style: 'Truck',
    price: 40000
  });
 instance1.save().then(doc=>{
  console.log("First object saved")}
 ).catch(err=>{
 console.error(err)
 });
 instance2.save().then(doc=>{
  console.log("Second object saved")}
 ).catch(err=>{
 console.error(err)
 });
 instance3.save().then(doc=>{
  console.log("Third object saved")}
 ).catch(err=>{
 console.error(err)
 });
}
let reseed = true;
if (reseed) {recreateDB();}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carRouter);
app.use('/board', boardRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

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
