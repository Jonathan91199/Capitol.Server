let mySql = require('mysql')

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
        console.log("Connected To DataBase")

    })
}

