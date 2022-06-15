class WaitingRoom {

    init() {

        this.ui()

    }

    //creates waiting room gui 
    async ui() {

        let div = document.createElement("div")
        div.id = "waitingRoom"
        div.innerHTML = `
        <p>session id:</p><p id="session_id">${await this.get_session_data()}</p>
        <div id="players"><p style="font-size:2.5vh">users in session:</p><hr /><div>${await this.get_users_html()}</div></div>
        <p style="font-size:1.5vh">You can press tab to view player in game</p><button style="width:30%" onclick="waitingRoom.leave()">start game</button>`
        document.body.append(div)

        document.getElementById('game').style.marginLeft = "10vw"

        let curtain = document.createElement('div')
        curtain.id = 'curtain'
        curtain.innerHTML = `<p>Waiting for more players to join...</p><img src="textures/loading.gif">`
        document.body.append(curtain)


    }

    //get html element of users
    async get_users_html() {

        try {
            let output = ''
            let users = JSON.parse(await net.sessionInfo(await this.get_session_data())).users

            for (let el of users) {
                output += `<p style="font-size:2vh;margin-top:1vh;">${el}<p>`
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

    async leave() {

        document.getElementById('waitingRoom').remove()
        document.getElementById('curtain').remove()
        document.getElementById('game').style.marginLeft = "0vw"
        game.start = new StartGame(JSON.parse(await new Net().getUsername(document.cookie.split("=")[1])).username)
        game.start.init()

    }
}