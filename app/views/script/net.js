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

    //register request
    //input: {email:string,username:string,password:string}
    //output: register status - (accepted/usernameTaken/emailTaken/fatalError)

    async register(data) {

        console.log("próba logowania");

        this.data = JSON.stringify(data)
        this.options = {
            method: "POST",
            body: this.data
        }

        let response = await fetch("/user/register", this.options)
        if (!response.ok) {
            return response.status
        } else {
            return await response.text()
        }

    }

}