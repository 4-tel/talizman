const logger = require('tracer').colorConsole()
const getRequestData = require('./getRequestData')
const databaseController = require('./databaseController')


const databaseRouter = async (req, res) => {

    if (req.method == "POST" && req.url == "/database/adduser") {

        let user = JSON.parse(await getRequestData(req))
        let status = databaseController.adduser(user)

    }

    else if (req.method == "GET" && req.url == "/database") {

        res.end(JSON.stringify(await databaseController.getRecords(), null, 5))

    }

    else if (req.url.match(/\/database\/remove\/([A-Za-z0-9]+)/)) {

        let username = req.url.split('/')[req.url.split('/').length - 1]

        let status = databaseController.removeUser(username)

        if (status) {
            res.end('user succesfully removed')
        } else {
            res.end('error')
        }

    }

    else if (req.method == "GET" && req.url.match(/\/database\/([A-Za-z0-9]+)/)) {

        let username = req.url.split('/')[req.url.split('/').length - 1]

        res.end(JSON.stringify(await databaseController.getRecordByUsername(username)))

    }

}

module.exports = databaseRouter