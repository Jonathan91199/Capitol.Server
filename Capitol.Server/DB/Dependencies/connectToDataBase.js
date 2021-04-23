let mySql = require('mysql')
let colors = require('colors')

const MY_SQL_HOSTNAME = "localhost"
const MY_SQL_USER = "root"
const MY_SQL_PASSWORD = "CapitolServer123"

module.exports = function connectToDataBase() {
    let connection = mySql.createConnection({
        host: MY_SQL_HOSTNAME,
        user: MY_SQL_USER,
        password: MY_SQL_PASSWORD
    })

    connection.connect(function (err) {
        if (err) throw err
        console.log(colors.inverse("*** Connected To Capitol DataBase ***"))
        connection.query("CREATE DATABASE IF NOT EXISTS CapitolDataBase", function (err, result) {
            if (err) throw err;
            colors.inverse("***DataBase Created ***");
          });
    })

    return connection
}

