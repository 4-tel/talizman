const logger = require('tracer').colorConsole()
const getRequestData = require('./getRequestData')
const databaseController = require('./databaseController')


const databaseRouter = async (req, res) => {

    if (req.method == "POST" && req.url == "/database/adduser") {

        let user = JSON.parse(await getRequestData(req))
        let status = databaseController.adduser(user)

    }

    else if (req.method == "GET" && req.url == "/database") {

        res.end(JSON.stringify(await databaseController.getRecords()))

    }

}

module.exports = databaseRouter