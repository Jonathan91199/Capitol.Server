let colors = require('colors')

module.exports = function createSensorComponentTable(connection) {
 
        let sql = `CREATE TABLE IF NOT EXISTS sensorComponentTable (componentId VARCHAR(255), sensorId VARCHAR(255), headerId VARCHAR(255), ipAddress VARCHAR(255))`;
        connection.query(sql, function (err) {
          if (err) throw err;
          console.log(colors.yellow.inverse("\n*** Sensor Component Table Created ***"));
        });


}   