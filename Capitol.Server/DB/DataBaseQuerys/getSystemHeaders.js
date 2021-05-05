let url = require('url')

module.exports = function getSystemHeaders(connection, req, res){
    connection.query(`SELECT * FROM headers where systemId='${url.parse(req.url,true).query.systemId}'`, function (err, result) {
        if (err) throw err
        res.send(result)
    })
}