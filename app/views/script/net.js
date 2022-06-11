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

        console.log("register");

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

    //login request
    //input: {username:string,password:string}
    //output: login status - (success/noUserFound/passwordIncorrect/fatalError)
    async login(data) {

        console.log('login');

        this.data = JSON.stringify(data)
        this.options = {
            method: "POST",
            body: this.data
        }

        let response = await fetch("/user/login", this.options)
        if (!response.ok) {
            return response.status
        } else {
            return await response.text()
        }

    }

    //get username from session token
    //input: token
    //output: username (or any decoded token)
    async getUsername(token) {

        console.log('token fetch');

        this.data = JSON.stringify(token)
        this.options = {
            method: "POST",
            body: this.data
        }

        let response = await fetch("/user/getUsername", this.options)
        if (!response.ok) {
            return response.status
        } else {
            return await response.text()
        }
    }

    //get statistics from server
    //no input
    //output: statistics of logged user
    async getStats() {

        console.log('stats fetch');

        this.data = JSON.stringify(JSON.parse(await this.getUsername(user.token)).username)
        this.options = {
            method: "POST",
            body: this.data
        }

        let response = await fetch("/database/statistics", this.options)
        if (!response.ok) {
            return response.status
        } else {
            return await response.text()
        }

    }

    //find empty session
    //no input
    //output: empty session id
    async findGame() {

        let response = await fetch("/session/find", { method: "GET" })
        if (!response.ok) {
            return response.status
        } else {
            return await response.text()
        }

    }

    //join session
    //input: id - optional
    //output: status
    async joinGame(id) {

        console.log('join game');

        this.data = JSON.stringify(id)
        this.options = {
            method: "POST",
            body: this.data
        }

        let response = await fetch("/session/join", this.options)
        if (!response.ok) {
            return response.status
        } else {
            return await response.text()
        }

    }

    //get session info
    //input: session id
    //output: session info
    async sessionInfo(id) {

        console.log('session info');

        let response = await fetch(`/session/${id}`, { method: "GET" })
        if (!response.ok) {
            return response.status
        } else {
            return await response.text()
        }

    }

    async moveToGameplay() {

        console.log("move to gameplay");

        let response = await fetch('/mainGame.html', { method: "GET" })
        if (!response.ok) {
            return response.status
        }

    }
}