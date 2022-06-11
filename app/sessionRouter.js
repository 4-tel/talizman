const logger = require('tracer').colorConsole()
const sessionController = require('./sessionController')
const getRequestData = require('./getRequestData')

const sessionRouter = async (req, res) => {

    if (req.method == "GET" && req.url == "/session/find") {

        res.end(JSON.stringify(sessionController.findGame()))

    }

    if (req.method == "POST" && req.url == "/session/join") {

        let data = JSON.parse(await getRequestData(req))

        let response = sessionController.joinGame(data.id)
        if (response.status == 'joined session') {
            res.end(JSON.stringify(response))
        }
        else {
            res.end({ status: "error" })
        }

    }

    else if (req.method == "GET" && req.url == "/session") {

        res.end(JSON.stringify(sessionController.viewSessions(), null, 5))

    }

    else if (req.method == "GET" && req.url.match(/\/session\/\/([A-Za-z0-9]+)/)) {

        let id = req.url.split("/")[req.url.split("/").length - 1]
        res.end(JSON.stringify(sessionController.getInformation(id), null, 5))

    }

}

module.exports = sessionRouter