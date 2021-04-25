let colors = require('colors')
let mySql = require ('mysql')


module.exports = function dropColumn(dataBase, tableName, columnName){
    let connection = mySql.createConnection({
        host: dataBase.hostName,
        user: dataBase.userName,
        password: dataBase.password,
        database: dataBase.dataBase
    })


    var sql = `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(colors.green.inverse(`Column '${columnName}' Droped !` ))
    });
}
