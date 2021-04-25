let colors = require('colors')
let mySql = require ('mysql')


module.exports = function addColumn(dataBase, tableName, newColumnName, newColumnType, afterWhatColumn){
    let connection = mySql.createConnection({
        host: dataBase.hostName,
        user: dataBase.userName,
        password: dataBase.password,
        database: dataBase.dataBase
    })


    var sql = `ALTER TABLE ${tableName} ADD COLUMN ${newColumnName} ${newColumnType} AFTER ${afterWhatColumn}`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(colors.green.inverse(`Added Column '${newColumnName}' !` ))
    });
}
