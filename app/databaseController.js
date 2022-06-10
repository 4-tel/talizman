const mongoose = require('mongoose')
const logger = require('tracer').colorConsole()
require('dotenv').config()

const url = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWD}@cluster0.mdiwtkg.mongodb.net/?retryWrites=true&w=majority`
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connect = async () => {
    mongoose.connect(url, connectionParams)
        .then(() => {
            logger.info('Connected to the database ')
            return 0
        })
        .catch((err) => {
            logger.error(`Error connecting to the database. n${err}`);
        })
}

const databaseController = {

    //adds a new user to database
    //input: {email:email,username:string,password:hash}
    //output: success message

    adduser: async (user) => {

        connect()

        let userSchema = new mongoose.Schema({
            email: String,
            username: String,
            password: String
        })

        let userModel = mongoose.model("User", userSchema)

        this.user = new userModel({ email: user.email, username: user.username, password: user.password })
        this.user.save()

    },

    //returns all records from collection
    getRecords: async () => {

        connect()

    }

}

module.exports = databaseController