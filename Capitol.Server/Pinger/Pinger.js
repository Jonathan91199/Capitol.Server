let ping = require('ping')
let changeComponent = require('../DB/DataBaseChanges/changeComponent')

module.exports = function Pinger(connection, callBack) {
    connection.query(`SELECT * FROM sensorComponentTable`, function (err, result) {
        if (err) throw err
        let allPromises = []

        result.forEach(component => {
            let previousPingAnswer = component.isAlive
            allPromises.push(new Promise((resolve) => {

                ping.sys.probe(component.ipAddress, function (isAlive, error) {
                    if (error) throw error
                    if(isAlive !== Boolean(previousPingAnswer))
                        changeComponent(connection, 'sensorcomponenttable', 'isAlive', 'componentId', component.componentId, isAlive ? 1 : 0 )
                    resolve()
                }, { timeout: 1 })

            }))
        })
        Promise.all(allPromises).then(() => {
            callBack()
        })
    })
}