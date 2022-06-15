const logger = require('tracer').colorConsole()
const getRequestData = require('./getRequestData')
const databaseController = require('./databaseController')


const databaseRouter = async (req, res) => {

    //method POST, add a new user record to database
    if (req.method == "POST" && req.url == "/database/adduser") {

        let user = JSON.parse(await getRequestData(req))
        let status = databaseController.adduser(user)

        if (status == 'success') {
            res.end('success')
        } else {
            res.end('error')
        }

    }

    //method GET, returns users collecion 
    else if (req.method == "GET" && req.url == "/database/accounts") {

        res.end(JSON.stringify(await databaseController.getRecords(), null, 5))

    }

    //remove an user by username
    else if (req.url.match(/\/database\/remove\/([A-Za-z0-9]+)/)) {

        let username = req.url.split('/')[req.url.split('/').length - 1]

        let status = databaseController.removeUser(username)

        if (status) {
            res.end('user succesfully removed')
        } else {
            res.end('error')
        }

    }

    //method GET, get user's statistics by username
    else if (req.method == "GET" && req.url.match(/\/database\/statistics\/([A-Za-z0-9]+)/)) {

        let username = req.url.split("/")[req.url.split("/").length - 1]
        res.end(JSON.stringify((await databaseController.getRecordByUsername(username)).statistics, null, 5))

    }

    //method GET, returns one record by username
    else if (req.method == "GET" && req.url.match(/\/database\/users\/([A-Za-z0-9]+)/)) {

        let username = req.url.split('/')[req.url.split('/').length - 1]
        res.end(JSON.stringify(await databaseController.getRecordByUsername(username)))

    }

    //method GET, returns sessions collection
    else if (req.method == "GET" && req.url == "/database/sessions") {

        res.end(JSON.stringify(await databaseController.getSessions(), null, 5))

    }

    //method GET, return session by id
    else if (req.method == "GET" && req.url.match(/\/database\/sessions\/([A-Za-z0-9]+)/)) {

        let id = req.url.split("/")[req.url.split("/").length - 1]
        res.end(JSON.stringify(await databaseController.getSession(id)), null, 5)

    }


}

module.exports = databaseRouter