let url = require('url')

module.exports = function getSystemMetaData(connection, req, res) {

    connection.query(`SELECT * FROM sensormetadata where systemId='${url.parse(req.url, true).query.systemId}'`, function (err, result) {
        if (err) throw err
        res.send(result)
    })
}