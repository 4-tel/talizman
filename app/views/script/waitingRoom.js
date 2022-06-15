class WaitingRoom {

    init() {

        this.ui()

    }

    //creates waiting room gui 
    async ui() {

        let div = document.createElement("div")
        div.id = "waitingRoom"
        div.innerHTML = `<h2 style="color:white">waiting for other players...</h2><hr />
        <p>session id:<span id="session_id">${await this.get_session_data()}</span></p>
        <div id="players"><p style="font-size:2.5vh">users in session:</p><hr /><div>${await this.get_users_html()}</div></div>
        <img src="/textures/wait.png"><button onclick="waitingRoom.leave()">start game</button>`
        document.body.append(div)

    }

    //get html element of users
    async get_users_html() {

        try {
            let output
            let users = JSON.parse(await net.sessionInfo(await this.get_session_data())).users

            for (let el of users) {
                output += `<p>${el}<p>`
            }

            return output
        } catch (e) {
            return ''
        }
    }

    //get session data from token in cookies
    async get_session_data() {

        let session_token = document.cookie.split('=')[1]
        let session_data = JSON.parse(await net.getUsername(session_token))
        let session_id = session_data.session

        return session_id

    }

    leave() {

        document.getElementById('waitingRoom').remove()
        game.start = new StartGame("maciek")
        game.start.init()

    }
}