const logger = require('tracer').colorConsole()
const sessionController = require('./sessionController')
const getRequestData = require('./getRequestData')
const databaseController = require('./databaseController')

const sessionRouter = async (req, res) => {

    //method GET, find first non full session and retrieve an id
    if (req.method == "GET" && req.url == "/session/find") {

        let sessions = await databaseController.getSessions()

        let response = sessionController.findGame(sessions)

        if (response.status == "found") {
            res.end(JSON.stringify(response.id))
        }
        else if (response.status == "created") {
            databaseController.addSession(response.session)
            res.end(JSON.stringify(response.id))
        } else {
            res.end('error')
        }

    }

    //method POST, adds user to session by id
    if (req.method == "POST" && req.url == "/session/join") {

        let data = JSON.parse(await getRequestData(req))

        let session = await databaseController.getSession(data.id)

        res.writeHead(200, { 'Content-Type': 'application/json' })


        //if session full
        if (session.users.length >= 14) {
            res.end("gameFull")
        }
        else {
            let add = await databaseController.addToSession(data.username, session)

            console.log(add);

            if (add) {
                res.end("success")
            } else {
                res.end("error")
            }
        }
    }

    //POST method, checks if session exists
    if (req.method == "POST" && req.url == "/session/create") {

        let data = JSON.parse(await getRequestData(req))
        try {
            await databaseController.addSession(data)
            res.end(JSON.stringify(''))
        } catch (e) {
            res.end(JSON.stringify(e.message))
        }

    }

}

module.exports = sessionRouter