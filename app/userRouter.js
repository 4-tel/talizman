const logger = require('tracer').colorConsole()
const userController = require('./userController')
const getRequestData = require('./getRequestData')
const databaseController = require('./databaseController')

const userRouter = async (req, res) => {

    if (req.url == "/user/register") {

        let data = JSON.parse(await getRequestData(req))

        let output = await userController.register(data)

        if (output == true) {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end("accepted")
        } else {
            res.end("failure")
        }
    }

    else if (req.url.match(/\/user\/confirm\/([A-Za-z0-9]+)/)) {

        let token = req.url.split("/")[req.url.split("/").length - 1]

        let output = await userController.verifyAccount(token)

        if (output.status == "success") {
            databaseController.adduser(output.user)
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end('<p style="margin:3vh;text-align:center">Account verified!</p>')
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end('<p style="margin:3vh;text-align:center">Token expired</p>')
        }

    }

}

module.exports = userRouter