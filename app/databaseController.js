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
            return true
        })
        .catch((err) => {
            logger.error(`Error connecting to the database. n${err}`);
            return false
        })
}

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    statistics: [{}]
}, { collection: 'users' })

const sessionSchema = new mongoose.Schema({
    id: String,
    users: [],
    status: String
}, { collection: 'sessions' })

const userModel = mongoose.model("User", userSchema)

const sessionModel = mongoose.model("Session", sessionSchema)

const databaseController = {

    //adds a new user to database
    //input: {email:email,username:string,password:hash}
    //output: success message
    adduser: async (user) => {

        if (await connect() == false) {
            return 'error'
        }

        this.user = new userModel({ email: user.email, username: user.username, password: user.password, statistics: [{ games_played: 0 }, { games_won: 0 }, { games_lost: 0 }] })
        this.user.save()

        return 'success'

    },

    //returns all records from collection
    getRecords: async () => {

        if (await connect() == false) {
            return 'error'
        }

        let docs = await userModel.find()

        return docs

    },

    //returns one record from collection by username
    getRecordByUsername: async (username) => {

        if (await connect() == false) {
            return 'error'
        }

        let docs = await userModel.find({ username: username })

        return docs[0]

    },

    //removes one user from collection by username
    //input: username - string
    //output: status - boolean
    removeUser: async (username) => {

        if (await connect() == false) {
            return false
        }

        try {
            await userModel.remove({ username: username })
            return true
        } catch (err) {
            logger.error(err.message)
            return false
        }
    },

    //add session to database
    //input: {id:id,users:[username]}
    //output: status
    addSession: async (session) => {

        if (await connect() == false) {
            return 'error'
        }

        console.log('add');

        this.session = new sessionModel({ id: session.id, users: session.users, status: 'await' })
        this.session.save()

    },

    //get sessions
    //no input
    //output: session array
    getSessions: async () => {
        return new Promise(async (resolve) => {

            if (await connect() == false) {
                resolve('error')
            }

            let docs = await sessionModel.find({})
            resolve(docs)

        })
    },

    //get session by id
    //input: id
    //output: session
    getSession: async (id) => {

        if (await connect() == false) {
            return 'error'
        }

        let docs = await sessionModel.find({ id: id })
        return docs[0]

    },

    //add user to session
    //input: username:string, sessionID:string
    //output: status
    addToSession: async (username, session) => {
        return new Promise(async (resolve) => {

            if (await connect() == false) {
                resolve(false)
            }

            let user = {
                name: username,
                hero: null
            }

            session.users.push(user)
            await session.save()
            resolve(true)
        })
    },

    //change session status (await, cards, started, finished)
    //input: string of status to change
    //output: status of success
    changeStatus: async (status, session) => {

        return new Promise(async (resolve) => {

            if (await connect() == false) {
                resolve(false)
            }

            session.status = status
            await session.save()
            resolve(true)
        })
    },

    //removes session
    //input: session id
    //output: status - boolean
    removeSession: async (id) => {

        if (await connect() == false) {
            return false
        }

        try {
            await sessionModel.remove({ id: id })
            return true
        } catch (err) {
            logger.error(err.message)
            return false
        }

    },

    //asigns hero to player
    //input: hero, player, session
    //output: status
    asignHero: async (hero, player, session) => {
        return new Promise(async (resolve) => {

            if (await connect() == false) {
                resolve(false)
            }

            for (let el of session.users) {
                if (el.name == player) {
                    el = session.users[session.users.length - 1]
                }
            }

            session.users.pop()

            session.users.push({ name: player, hero: hero })

            await session.save()
            resolve(true)
        })


    }

}

module.exports = databaseController