let colors = require('colors')
let mySql = require('mysql')
let createSystemTable = require('./Dependencies/createSystemTable')
let createHeaderTable = require('./Dependencies/createHeaderTable')
let createSensorMetaDataTable = require('./Dependencies/createSensorMetaDataTable')
let createSensorComponentTable = require('./Dependencies/createSensorComponentTable')
let createComponentAdvancedOptionsTable = require('./Dependencies/createComponentAdvancedOptionsTable')
let createMicroServiceTable = require('./Dependencies/createMicroServiceTable')

module.exports = function createTables(dataBase) {
    let connection = mySql.createConnection({
        host: dataBase.hostName,
        user: dataBase.userName,
        password: dataBase.password,
        database: dataBase.dataBase
    })
    connection.connect(function (err) {
        if (err) throw err
        console.log(colors.inverse("*** Connected To Capitol DataBase ***"))
        createSystemTable(connection)
        createHeaderTable(connection)
        createSensorMetaDataTable(connection)
        createSensorComponentTable(connection)
        createComponentAdvancedOptionsTable(connection)
        createMicroServiceTable(connection)
    })
    return(connection)
}   