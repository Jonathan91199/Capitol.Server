var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let uuid = require('uuid')
let cors = require('cors')
let connectToDataBase = require('./DB/connectToDataBase')
let Pinger = require('./Pinger/Pinger')
let insertToTable = require('./DB/Manual/insertToTable')
let addColumn = require('./DB/Manual/AlterTable/addColumn')
let dropColumn = require('./DB/Manual/AlterTable/dropColumn')
let createTables = require('./DB/CreateTables/createTables')
let getSystems = require('./DB/DataBaseQuerys/getSystems')
let getSystemMetaData = require('./DB/DataBaseQuerys/getSystemMetaData')
let getSystemHeaders = require('./DB/DataBaseQuerys/getSystemHeaders')
let changeComponent = require('./DB/DataBaseChanges/changeComponent')

const PING_UPDATE_TIME = 3000 //In MiliSeconds
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
  createTables(DataBaseData, (connection) => {
    fullDataBaseConnection = connection
    initializePinger()
  })
})

function initializePinger() {
  Pinger(fullDataBaseConnection, () => {
    setTimeout(() => initializePinger(), PING_UPDATE_TIME)
  })
}
// **************************** //
// ***** Manual Functions ***** //
// **************************** //

// insertToTable(DataBaseData, "sensorcomponenttable", ["componentId", "sensorId", "headerId", "ipAddress", "isAlive"], [uuid.v1(),'0ba518d0-a902-11eb-9c68-8baf873238fc','4f8a1220-a854-11eb-9954-478719b9d960' , '125.0.0.1', true])
// addColumn(DataBaseData, "sensorcomponenttable", "isAlive", 'BOOLEAN', 'ipAddress')
// dropColumn(DataBaseData, 'sensorcomponenttable', 'isAlive')
//******************************** //
// ************* API ************* //
//******************************** //

app.get('/api/systems', (req, res) => {
  getSystems(fullDataBaseConnection, req, res)
})
app.get('/api/systemHeaders', (req, res) => {
  getSystemHeaders(fullDataBaseConnection, req, res)
})
app.get('/api/systemMetaData', (req, res) => {
  getSystemMetaData(fullDataBaseConnection, req, res)
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
