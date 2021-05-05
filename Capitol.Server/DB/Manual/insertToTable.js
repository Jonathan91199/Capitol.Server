let colors = require('colors')
let mySql = require('mysql')
let uuid = require('uuid')


module.exports = function insertToTable(dataBase, tableName, columns, values) {
  let connection = mySql.createConnection({
    host: dataBase.hostName,
    user: dataBase.userName,
    password: dataBase.password,
    database: dataBase.dataBase
  })

  let allColumns = ''
  let allValues = ''
  columns.forEach(column => {
    allColumns = allColumns.concat(`${column},`)
  })
  allColumns = allColumns.substring(0, allColumns.length - 1)

  values.forEach(value => {
    if (typeof(value)==="boolean") {
      allValues = allValues.concat(`${value},`)
    }
    else
      allValues = allValues.concat(`'${value}',`)
  })
  allValues = allValues.substring(0, allValues.length - 1)
  var sql = `INSERT INTO ${tableName} (${allColumns}) VALUES (${allValues})`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(colors.green.inverse("Inserted To Table !"))
  });
}
