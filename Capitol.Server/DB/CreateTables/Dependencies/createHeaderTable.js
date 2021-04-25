let colors = require('colors')

module.exports = function createHeaderTable(connection) {
  
        let sql = `CREATE TABLE IF NOT EXISTS Headers (systemId VARCHAR(255), headerId VARCHAR(255), headerName VARCHAR(255))`;
        connection.query(sql, function (err) {
          if (err) throw err;
          console.log(colors.yellow.inverse("\n*** Header Table Created ***"));
        });

    return connection
}   