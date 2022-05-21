class Net {

    //requests server for player to join
    //input: username - string; id - string
    //output: boolean - login success verification

    async joinGameRequest(username, id) {

        if (username.trim() == 0) {
            ui.loginMsg("Please insert username")
            return false
        }

        this.data = JSON.stringify({
            username: username,
            id: id
        })

        this.options = {
            method: "POST",
            body: this.data
        }

        // console.log(options);

        this.response = await fetch("/join", this.options)
        if (!this.response.ok)
            return this.response.status
        else
            return await this.response.text() //response.json

        // fetch("/join", this.options)

    }

}