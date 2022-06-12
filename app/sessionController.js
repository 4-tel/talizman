const logger = require('tracer').colorConsole()

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
    //output: non-full game id
    findGame: (sessions) => {

        let output = { status: null, id: null, session: null }

        //search for empty game
        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].users.length < 14) {

                output.status = "found"
                output.id = sessions[i].id
                return output
            }
        }

        //if non found
        output.status = "created"
        output.id = sessionController.idGenerator(8)
        output.session = { id: output.id, users: new Array() }
        return output

    }
}

module.exports = sessionController