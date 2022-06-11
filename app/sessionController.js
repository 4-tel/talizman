const logger = require('tracer').colorConsole()

const sessions = new Array()

const sessionController = {
    //creates a unique random id
    //input: length of an id; amount of characters
    //output: pseudo random unique id (string)

    idGenerator: (length) => {

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

    findGame: () => {

        let output = ""

        //search for empty game
        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].users.length < 14) {

                output = sessions[i].id
                return output
            }
        }

        //if non found

        output = sessionController.idGenerator(8)
        sessions.push({ id: output, users: new Array() })

        return output

    },


    //logs in new users to session by id (max 14 users) or creates a new one
    //input: {username:username, id:id}
    //output: {status:string,id:id}

    joinGame: (data) => {

        let output

        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].id == data.id) {
                if (sessions[i].users.length > 14) {
                    return { status: "session full" }
                }
                else {
                    sessions[i].users.push(data.username)
                    return { status: 'joined session', id: sessions[i].id }
                }
            }
        }

        //if not found

        sessions.push({ id: data.id, users: new Array().push(data.username) })
        return { status: 'joined session', id: data.id }

    },

    //returns info about desired session by id
    //input: session id
    //output: {id:id, users:[]}

    getInformation: (id) => {

        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].id == id) {
                return sessions[i]
            }
        }

        return null

    },

    viewSessions: () => {

        return sessions

    }
}

module.exports = sessionController