const logger = require('tracer').colorConsole()
const userController = require('./userController')
const getRequestData = require('./getRequestData')
const databaseController = require('./databaseController')

const userRouter = async (req, res) => {

    if (req.url == "/user/register") {

        let data = JSON.parse(await getRequestData(req))

        let databaseUsers = await databaseController.getRecords()

        for (let record of databaseUsers) {
            if (record.username == data.username) {
                res.end("usernameTaken")
            }
            else if (record.email == data.email) {
                res.end("emailTaken")
            }
        }

        let output = await userController.register(data)

        if (output == true) {
            res.end("accepted")
        } else {
            res.end("fataError")
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

    else if (req.url == "/user/login") {

        let data = JSON.parse(await getRequestData(req))

        let databaseUsers = await databaseController.getRecords()
        let output = await userController.login(data, databaseUsers)

        if (output.status == 'success') {
            res.end(JSON.stringify(output))
        }
        else if (output.status == 'passwordIncorrect') {
            res.end(JSON.stringify({ status: 'passwordIncorrect' }))
        }
        else if (output.status == 'noUserFound') {
            res.end(JSON.stringify({ status: 'noUserFound' }))
        }
        else {
            res.end(JSON.stringify({ status: 'fatalError' }))
        }

    }

}

module.exports = userRouter