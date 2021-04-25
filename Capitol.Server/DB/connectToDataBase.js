let mySql = require('mysql')
let colors = require('colors')
let createTables = require('./CreateTables/createTables')


module.exports = function connectToDataBase(dataBase) {
    let connection = mySql.createConnection({
        host: dataBase.hostName,
        user: dataBase.userName,
        password: dataBase.password
    })

    connection.connect(function (err) {
        if (err) throw err
        console.log(colors.inverse("*** Connected To MySql ***"))
        connection.query(`CREATE DATABASE IF NOT EXISTS ${dataBase.dataBase}`, function (err, result) {
            if (err) throw err;
            console.log(colors.inverse("*** DataBase Created ***"))
            createTables(dataBase)
        });
        

    })

    return connection
}

