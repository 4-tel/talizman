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

    //attempts to register an user
    //input: {email:string,username:string,password:string}
    //output: boolean - register success

    register: async (data) => {

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

    //verifies account by user personal token
    //input: token
    //output: status - string

    verifyAccount: async (token) => {

        try {
            let decoded = jwt.verify(token, process.env.TOKEN_PASSWD)

            logger.info('account verified')
            return { status: "success", user: decoded }

        } catch (err) {
            logger.error(err.message)
            return { status: "invalid token" }
        }

    },

    //attempts to login an user
    //input: {username:string,password:string}, database
    //output: {status:string,token}

    login: async (user, database) => {

        for (let record of database) {
            if (record.username == user.username) {
                if (await bcrypt.compare(user.password, record.password)) {

                    let token = jwt.sign({
                        username: record.username,
                    },
                        process.env.TOKEN_PASSWD)

                    logger.log('user logged in')
                    return { status: "success", token: token }

                } else {
                    return { status: 'passwordIncorrect' }
                }
            }
        }
        return { status: 'noUserFound' }

    },

    //read token
    //input: token
    //output: {} - token encrypted 
    readToken: (token) => {

        let decoded = jwt.verify(token, process.env.TOKEN_PASSWD)
        return decoded

    },

    //check for duplicates in username or email
    //input: user to check, users from database
    //output: status
    async findDuplicate(data, databaseUsers) {

        return new Promise(async (resolve) => {
            for (let record of databaseUsers) {

                if (record.username == data.username) {

                    logger.warn('username taken')
                    resolve('usernameTaken')
                }
                else if (record.email == data.email) {

                    logger.warn('email taken')
                    resolve('emailTaken')
                }
            }

            resolve('nothing')

        })

    }

}

module.exports = userController