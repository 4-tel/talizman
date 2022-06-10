const logger = require('tracer').colorConsole()
const userController = require('./userController')
const getRequestData = require('./getRequestData')

const userRouter = async (req, res) => {

    if (req.url == "/user/register") {

        let data = JSON.parse(await getRequestData(req))

        let output = await userController.register(data)

        if (output == true) {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end("accepted")
        } else {
            res.end("failure")
        }

    }

}

module.exports = userRouter