let colors = require('colors')

module.exports = function createSensorMetaDataTable(connection) {
 
        let sql = `CREATE TABLE IF NOT EXISTS sensorMetaData (sensorId VARCHAR(255), systemId VARCHAR(255), sensorName VARCHAR(255), sensorNotes VARCHAR(255))`;
        connection.query(sql, function (err) {
          if (err) throw err;
          console.log(colors.yellow.inverse("\n*** Sensor MetaData Table Created ***"));
        });


}   