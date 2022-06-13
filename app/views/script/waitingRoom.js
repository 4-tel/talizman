class WaitingRoom {

    init() {

        this.ui()

    }

    //creates waiting room gui 
    async ui() {

        let div = document.createElement("div")
        div.id = "waitingRoom"
        div.innerHTML = `<h2 style="color:white">await players</h2><hr />
        <p>session id:<span id="session_id">${user.session_id}</span></p>
        <div id="players"><p style="font-size:2.5vh">users in session:</p><hr />${await this.get_users_html()}</div>`
        document.body.append(div)

    }

    async get_users_html() {

        try {
            let output
            let users = JSON.parse(await net.sessionInfo(user.session_id)).users

            for (let el of users) {
                output += `<p>${el}<p><br/>`
            }

            return output
        } catch (e) {
            return ''
        }

    }

}