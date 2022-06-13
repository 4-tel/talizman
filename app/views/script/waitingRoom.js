class WaitingRoom {

    init() {

        this.ui()

    }

    ui() {

        let div = document.createElement("div")
        div.id = "waitingRoom"
        div.innerHTML = `<h1>await players</h1><hr />
        <p style="text-decoration:underline">session id: <span id="session_id">123456</span></p>
        <div id="players"><p style="font-size:2vh">users in session:</p><hr /></div>`
        document.body.append(div)

    }

}