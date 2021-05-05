
module.exports = function changeComponent(connection, tableName, columnToChange, columnIndicator, columnIndicatorPreviusValue, newValue) {
    connection.query(`UPDATE ${tableName} SET ${columnToChange} = '${newValue}' WHERE ${columnIndicator} = '${columnIndicatorPreviusValue}'`, function (err, result) {
        if (err) throw err
        console.log("Component Changed")
    })
}