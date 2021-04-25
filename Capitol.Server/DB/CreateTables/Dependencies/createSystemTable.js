let colors = require('colors')

module.exports = function createSystemTable(connection) {
 
        let sql = `CREATE TABLE IF NOT EXISTS Systems (systemId VARCHAR(255), systemName VARCHAR(255))`;
        connection.query(sql, function (err) {
          if (err) throw err;
          console.log(colors.yellow.inverse("\n*** System Table Created ***"));
        });
        // connection.query('ALTER TABLE Systems DROP COLUMN testt')



}   