const logger = require('tracer').colorConsole()
const mongoose = require('mongoose')
require('dotenv').config()

const url = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWD}@cluster0.mdiwtkg.mongodb.net/?retryWrites=true&w=majority`
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, connectionParams)
    .then(() => {
        logger.log('Connected to the database ')
    })
    .catch((err) => {
        logger.error(`Error connecting to the database. n${err}`);
    })

const databaseRouter = async (req, res) => {

    if (req.url == "/database/adduser") {

        

    }

}

module.exports = databaseRouter