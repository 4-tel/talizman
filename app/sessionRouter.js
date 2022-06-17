const logger = require('tracer').colorConsole()
const sessionController = require('./sessionController')
const getRequestData = require('./getRequestData')
const databaseController = require('./databaseController')
const fs = require("fs")

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

    //GET method; get empty sessions
    if (req.method == "GET" && req.url == "/session/empty") {

        let sessions = await databaseController.getSessions()
        let empty = await sessionController.findEmpty(sessions)

        if (empty.length == 0) {
            res.end("found nothing")
        } else {
            res.end(JSON.stringify(empty, null, 5))
        }

    }

    //DELETE method; remove session by id
    if (req.method == "DELETE" && req.url.match(/\/session\/remove\/([A-Za-z0-9]+)/)) {

        let id = req.url.split('/')[req.url.split('/').length - 1]

        let status = await databaseController.removeSession(id)
        if (status) {
            res.end("success")
        } else {
            res.end("error")
        }

    }

    //DELETE method; remove empty sessions
    if (req.method == "DELETE" && req.url == "/session/empty/remove") {

        let sessions = await databaseController.getSessions()
        let empty = await sessionController.findEmpty(sessions)



        if (empty.length == 0) {
            res.end('no empty sessions')
        }

        else {

            try {
                for (let el of empty) {
                    await databaseController.removeSession(el.id)
                }
                res.end(`removed ${empty.length} elements`)
            } catch (e) {
                logger.error(e.message)
                res.end('error')
            }
        }

    }

    //POST method; create session token
    if (req.method == "POST" && req.url == "/session/token") {

        let data = JSON.parse(await getRequestData(req))

        let token = await sessionController.createToken(data.username, data.session_id)

        if (token == 'error') {
            res.end('error')
        } else {
            res.end(JSON.stringify(token))
        }
    }

    //method POST; change status of session
    if (req.method == "POST" && req.url == "/session/status") {

        let data = JSON.parse(await getRequestData(req))

        let session = await databaseController.getSession(data.id)

        if (await databaseController.changeStatus(data.status, session)) {
            res.end('success')
        } else {
            res.end('error')
        }

    }

    //method POST; choose hero as player
    //input: {user, hero, id}
    if (req.method == "POST" && req.url == "/session/assignhero") {

        let data = JSON.parse(await getRequestData(req))

        let session = await databaseController.getSession(data.id)

        if (await databaseController.asignHero(data.hero, data.user, session)) {
            res.end('success')
        } else {
            res.end('error')
        }

    }

    //method POST, change player's position
    //input: {player, data, session_id}
    if (req.method == "POST" && req.url == "/session/changeposition") {

        let data = JSON.parse(await getRequestData(req))

        let session = await databaseController.getSession(data.session_id)

        if (await databaseController.changePlayerPosition(data.player, data.data, session)) {
            res.end('success')
        } else {
            res.end('error')
        }
    }

    //method PATCH, change session's turn
    //input: session_id
    if (req.method == "PATCH" && req.url == '/session/iterateturn') {

        let data = JSON.parse(await getRequestData(req))

        let session = await databaseController.getSession(data.id)

        if (await databaseController.iterateTurn(session)) {
            res.end('success')
        } else {
            res.end('error')
        }
    }

    //method POST, announce winner
    if (req.method == "POST" && req.url == '/session/winner') {

        let data = JSON.parse(await getRequestData(req))

        let session = await databaseController.getSession(data.id)

        if (await databaseController.winner(session, data.winner)) {
            res.end('success')
        } else {
            res.end('error')
        }
    }

    //method GET, remove all sessions
    if (req.method == "GET" && req.url == '/session/purge') {

        let sessions = await databaseController.getSessions()

        try {

            for (let el of sessions) {
                databaseController.removeSession(el.id)
            }

            res.end('purged all sessions')

        } catch (e) {

            res.end(JSON.stringify(e.message))

        }

    }

}

module.exports = sessionRouter