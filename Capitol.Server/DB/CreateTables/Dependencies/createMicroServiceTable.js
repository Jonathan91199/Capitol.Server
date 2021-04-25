let colors = require('colors')

module.exports = function createMicroServiceTable(connection) {
 
        let sql = `CREATE TABLE IF NOT EXISTS microServiceTable (sensorId VARCHAR(255), microServiceName VARCHAR(255), apiUrl VARCHAR(255))`;
        connection.query(sql, function (err) {
          if (err) throw err;
          console.log(colors.yellow.inverse("\n*** MicroService Table Created ***"));
        });


}   