module.exports = function getSystems(connection, req, res) {
    connection.query(`SELECT * FROM systems`, function (err, result) {
        if (err) throw err
        res.send(result)
    })
}