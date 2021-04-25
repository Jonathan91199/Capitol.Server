let colors = require('colors')

module.exports = function createComponentAdvancedOptionsTable(connection) {
 
        let sql = `CREATE TABLE IF NOT EXISTS componentAdvancedOptions (componentId VARCHAR(255), sensorId VARCHAR(255), showRdp BOOLEAN, showControl BOOLEAN)`;
        connection.query(sql, function (err) {
          if (err) throw err;
          console.log(colors.yellow.inverse("\n*** Component Advanced Options Table Created ***"));
        });


}   