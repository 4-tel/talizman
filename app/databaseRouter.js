const logger = require('tracer').colorConsole()

const databaseRouter = async (req, res) => {

    logger.log("database")
    res.end("0")
}

module.exports = databaseRouter