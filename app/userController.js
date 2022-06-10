//user controller controls users and sessions

const logger = require('tracer').colorConsole()
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//nodemailer auth and conf
const config = {
    service: 'Yahoo',
    auth: {
        user: process.env.YAHOO_LOGIN,
        pass: process.env.YAHOO_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
}
const transporter = nodemailer.createTransport(config)



const sessions = new Array()

const userController = {

    //creates a unique random id
    //input: length of an id; amount of characters
    //output: pseudo random unique id (string)

    idGenerator(length) {

        let output = ""
        let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'w', 'x', 'y', 'z']

        for (let i = 0; i < length; i++) {
            if (Math.floor(Math.random() * 2) == 1) {
                output += alphabet[Math.floor(Math.random() * alphabet.length)]
            }
            else {
                output += `${Math.floor(Math.random() * 9)}`
            }

            if (i == length) {
                sessions.forEach((e) => {
                    if (e.id == output) {
                        i = 0
                        output = ""
                    }
                })
            }
        }

        return output

    },

    //either finds the first non full session or creates a new one
    //no input
    //output: the empty game id

    findGame() {

        let output = ""

        //search for empty game
        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].users.length < 14) {

                output = sessions[i].id
                return output
            }
        }

        //if non found

        output = this.idGenerator(8)
        sessions.push({ id: output, users: new Array() })

        return output

    },


    //logs in new users to session by id (max 14 users) or creates a new one
    //input: {username:username, id:id}
    //output: login check - boolean

    joinGame(data) {

        let output

        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].id == data.id) {
                if (sessions[i].users.length > 14) {
                    return false
                }
                else {
                    sessions[i].users.push(data.username)
                    return true
                }
            }
        }

        //if not found

        sessions.push({ id: data.id, users: new Array().push(data.username) })
        return true

    },

    //returns info about desired session by id
    //input: session id
    //output: {id:id, users:[]}

    getInformation(id) {

        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].id == id) {
                return sessions[i]
            }
        }

        return null

    },

    //attempts to register an user
    //input: {email:string,username:string,password:string}
    //output: boolean - register success

    async register(data) {

        console.log(data);

        //create token
        try {
            let token = jwt.sign(
                {
                    email: data.email,
                    username: data.username,
                    password: await bcrypt.hash(data.password, 10)
                },
                process.env.TOKEN_PASSWD,
                {
                    expiresIn: "10m"
                }
            )

            //send email
            transporter.sendMail({
                from: process.env.YAHOO_LOGIN,
                to: data.email,
                subject: 'Talisman - confirm account',
                html: `<div style="width: 100%;height:100%;position: absolute;">
                <link rel="stylesheet" href="http://localhost:3000/style/mail.css">
                <p style="text-align: center;font-size: 200%;">click to verify your account!</p>
                <a id="token" href="http://localhost:3000/user/confirm/${token}">verify account</a>
            </div>`
            });

            logger.log("email sent")
            return true

        } catch (e) {

            logger.error(e.message)
            return false

        }
    },

    async verifyAccount(token) {

        try {
            let decoded = jwt.verify(token, process.env.TOKEN_PASSWD)

            console.log(decoded);
            return { status: "success", user: decoded }

        } catch (err) {
            logger.error(err.message)
            return { status: "invalid token" }
        }

    }

}

module.exports = userController