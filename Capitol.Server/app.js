var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let uuid = require('uuid')
let cors = require('cors')
let connectToDataBase = require('./DB/connectToDataBase')
let insertToTable = require('./DB/Manual/insertToTable')
let addColumn = require('./DB/Manual/AlterTable/addColumn')
let dropColumn = require('./DB/Manual/AlterTable/dropColumn')
let createTables = require('./DB/CreateTables/createTables')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let getSystems = require('./DB/DataBaseQuerys/getSystems')
let getSystemHeaders = require('./DB/DataBaseQuerys/getSystemHeaders')


var app = express();
app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//******************************** //
// ********** DataBase *********** //
//******************************** //


const DataBaseData = {
  hostName: "localhost",
  userName: "root",
  password: "CapitolServer123",
  dataBase: "CapitolDataBase"
}
let fullDataBaseConnection
connectToDataBase(DataBaseData, () => {
  fullDataBaseConnection = createTables(DataBaseData)
})
// **************************** //
// ***** Manual Functions ***** //
// **************************** //

// insertToTable(DataBaseData, "headers", ["systemId", "headerId", "headerName"], ['1bbe8760-a5bf-11eb-81f0-6d15fe2d60bc',uuid.v1(), "DNS Server"])
// addColumn(DataBaseData, "systems", "Jony", 'VARCHAR(255)', 'systemName')
// dropColumn(DataBaseData, 'systems', 'Jony')

//******************************** //
// ************* API ************* //
//******************************** //

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/api/systems', (req, res) => {
  getSystems(fullDataBaseConnection, req, res)
})
app.get('/api/systemHeaders', (req, res) => {
  getSystemHeaders(fullDataBaseConnection, req, res)
})



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
