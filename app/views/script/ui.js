class Ui {

    init() {
        this.chooseMenuOption()
    }

    //makes menu elements clickable
    chooseMenuOption() {

        let els = document.getElementById("menu").children

        for (let el of els) {

            switch (el.innerText) {
                case "join game":
                    el.onclick = () => {
                        this.clearChosen(el)
                        this.joinGame()
                    }
                    break;
                case "login":
                    el.onclick = () => {
                        this.clearChosen(el)
                        this.login()
                    }
                    break;
                case "register":
                    el.onclick = () => {
                        this.clearChosen(el)
                        this.register()
                    }
                    break;
                case "statistics":
                    el.onclick = () => {
                        this.clearChosen(el)
                        this.stats()
                    }
                    break;
                case "account":
                    el.onclick = () => {
                        this.clearChosen(el)
                    }
                    break;
            }

        }
    }

    //click on menu option
    clearChosen(el) {
        document.getElementById("options").style.border = '0.2vh solid black'
        let chosen = document.getElementsByClassName("chosen")
        chosen.length > 0 ? chosen[0].classList.remove("chosen") : null
        el.classList.add("chosen")
    }

    //creates game join ui
    async joinGame() {
        if (user.logged == false) {
            document.getElementById("options").style.height = "37vh"
            document.getElementById("options").innerHTML = layout.joinGame_guest
        } else {
            document.getElementById("options").style.height = "30vh"
            document.getElementById("options").innerHTML = layout.joinGame_user
            document.getElementById("options").children[3].innerText = `You plan as ${JSON.parse(await net.getUsername(user.token)).username}`
        }

    }

    //creates login ui
    login() {
        document.getElementById("options").style.height = "30vh"
        document.getElementById("options").innerHTML = layout.login

    }

    //handles login inputs
    async handleLogin() {

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
                this.chooseMenuOption()
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


    //creates register ui
    register() {

        document.getElementById("options").style.height = "44vh"
        document.getElementById("options").innerHTML = layout.register

    }

    //handles register inputs
    async handleRegister() {

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

    //creates statistics ui
    async stats() {
        if (user.logged == false) {
            document.getElementById("options").style.height = "15vh"
            document.getElementById("options").innerHTML = `<h3>statistics</h3>
            <hr /><br />
            <p style="color:#995544">Login to view personal statistics</p>`
        } else {
            document.getElementById("options").style.height = "fit-content"
            document.getElementById("options").innerHTML = `<h3>statistics</h3>
            <hr /><br />
            <p style="margin:1vh">${await net.getStats()}</p>`
        }

    }


}