const logger = require('tracer').colorConsole()

const userRouter = async (req, res) => {

    if (req.url == "/user/login") {
        logger.log("login")
        res.end("0")
    }

}

module.exports = userRouter