const logger = require('tracer').colorConsole()

const sessionRouter = async (req, res) => {
    logger.log("session")
    res.end("0")
}

module.exports = sessionRouter