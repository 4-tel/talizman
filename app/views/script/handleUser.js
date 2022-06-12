class HandleUser {

    //handles login inputs
    async login() {

        let pass = true

        if (document.getElementById("username").value.trim().length == 0) {
            document.getElementById("username").parentElement.children[2].innerText = 'this element must not be empty'
            pass = false
        }
        else {
            document.getElementById("username").parentElement.children[2].innerText = ''
        }
        if (document.getElementById("passwd").value.trim().length == 0) {
            document.getElementById("passwd").parentElement.children[2].innerText = 'this element must not be empty'
            pass = false
        }
        else {
            document.getElementById("passwd").parentElement.children[2].innerText = ''
        }

        if (pass == false) {
            return false
        }

        let data = {
            username: document.getElementById("username").value,
            password: document.getElementById("passwd").value
        }

        document.getElementById("options").children[document.getElementById("options").children.length - 1].innerText = ''
        document.getElementById("options").style.height = "30vh"

        let response = JSON.parse(await net.login(data))
        switch (response.status) {
            case 'success':
                document.getElementById("options").innerHTML = '<p style="color:#995544; margin:2vh">Successfully logged in!</p>'
                document.getElementById("options").style.height = "10vh"
                document.getElementById("menu").innerHTML = "<li>join game</li><li>account</li><li>statistics</li>"
                ui.chooseMenuOption()
                user.logged = true
                user.token = response.token
                break;
            case 'passwordIncorrect':
                document.getElementById("options").children[document.getElementById("options").children.length - 1].innerText = 'Password incorrect'
                document.getElementById("options").style.height = "36vh"
                break;
            case 'noUserFound':
                document.getElementById("options").children[document.getElementById("options").children.length - 1].innerText = 'User not found - create account first'
                document.getElementById("options").style.height = "36vh"
                break;
            case 'fatalError':
                document.getElementById("options").children[document.getElementById("options").children.length - 1].innerText = 'Some unexpected error occured :/'
                document.getElementById("options").style.height = "36vh"
                break;
        }

    }

    //handles register inputs
    async register() {

        let pass = true

        if (document.getElementById("username").value.trim().length == 0) {
            document.getElementById("username").parentElement.children[2].innerText = 'this element must not be empty'
            pass = false
        }
        else {
            document.getElementById("username").parentElement.children[2].innerText = ''
        }
        if (document.getElementById("email").value.trim().length == 0) {
            document.getElementById("email").parentElement.children[2].innerText = 'this element must not be empty'
            pass = false
        }
        else {
            document.getElementById("email").parentElement.children[2].innerText = ''
        }
        if (document.getElementById("passwd").value.trim().length == 0) {
            document.getElementById("passwd").parentElement.children[2].innerText = 'this element must not be empty'
            pass = false
        }
        else {
            document.getElementById("passwd").parentElement.children[2].innerText = ''
        }
        if (document.getElementById("confPasswd").value.trim().length == 0) {
            document.getElementById("confPasswd").parentElement.children[2].innerText = 'this element must not be empty'
            pass = false
        }
        else {
            document.getElementById("confPasswd").parentElement.children[2].innerText = ''
        }

        if (pass == false) {
            return false
        }

        if (document.getElementById("passwd").value != document.getElementById("confPasswd").value) {
            document.getElementById("confPasswd").parentElement.children[2].innerText = 'passwords are not the same'
            return false
        }

        let data = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("passwd").value
        }

        document.getElementById("options").children[document.getElementById("options").children.length - 1].innerText = ''
        document.getElementById("options").style.height = "44vh"

        let status = await net.register(data)
        switch (status) {
            case "accepted":
                document.getElementById("options").innerHTML = '<p style="color:#995544; margin:2vh">Request sent. Check your email to confirm your request (expires in 10 minutes)</p>'
                document.getElementById("options").style.height = "13vh"
                break;
            case "usernameTaken":
                document.getElementById("options").children[document.getElementById("options").children.length - 1].innerText = 'Given username is taken. Try to login or come up with something else'
                document.getElementById("options").style.height = "50vh"
                break;
            case "emailTaken":
                document.getElementById("options").children[document.getElementById("options").children.length - 1].innerText = 'User with given email already exists. Try to login or type different email'
                document.getElementById("options").style.height = "50vh"
                break;
            case "fatalError":
                document.getElementById("options").children[document.getElementById("options").children.length - 1].innerText = 'Some unexpected error occured :/'
                document.getElementById("options").style.height = "50vh"
                break;
        }
    }

    //attempts to join player to the session
    //no input
    //no output
    async joinGame() {

        let id = await this.getSessionId()
        let username = await this.getSessionUsername(id)

        let status = await net.joinGame(id, username)
        if (status == "success") {
            user.session_id = id
            document.location.href = '/mainGame.html'
        } else {
            ui.joinFail()
        }

    }

    //returns session id from ui or server
    async getSessionId() {

        //check if session id given by user
        if (document.getElementById("idJoin").value.trim() == "") {
            return JSON.parse(await net.findGame())
        } else {
            return document.getElementById("idJoin").value
        }

    }

    //returns users name for session foin
    async getSessionUsername(id) {

        console.log('usercheck');

        //check if user is logged in
        if (user.logged) {
            return JSON.parse(await net.getUsername(user.token)).username
        } else {

            let session

            try {
                session = JSON.parse(await net.sessionInfo(id))
            } catch (e) {
                console.log("thissss");
                await net.createSession({ id: id, users: [] })
                session = JSON.parse(await net.sessionInfo(id))
            }

            //if guest has given a username
            if (document.getElementById('guestName').value.trim() != "") {

                for (let user of session.users) {
                    //if username is taken
                    if (user == document.getElementById('guestName').value.trim()) {
                        user.guestName = 'guest' + session.users.length
                        return 'guest' + session.users.length
                    }
                }
                //if username is unique
                user.guestName = document.getElementById('guestName').value.trim()
                return document.getElementById('guestName').value.trim()
            }
            else {

                user.guestName = 'guest' + session.users.length
                return 'guest' + session.users.length

            }

        }

    }

}