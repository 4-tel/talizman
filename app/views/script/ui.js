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
            }

        }
    }

    //click on menu option
    clearChosen(el) {
        let chosen = document.getElementsByClassName("chosen")
        chosen.length > 0 ? chosen[0].classList.remove("chosen") : null
        el.classList.add("chosen")
    }

    //creates game join ui
    joinGame() {

        document.getElementById("options").style.height = "37vh"
        document.getElementById("options").innerHTML = layout.joinGame

    }

    //creates login ui
    login() {

        document.getElementById("options").style.height = "30vh"
        document.getElementById("options").innerHTML = layout.login

    }

    loginInvalid() {
        document.getElementById("options").innerHTML += `<p style="color:#995544;font-size:2vh">Invalid login<br/>if you don't have an account yet, register first</p>`
        document.getElementById("options").style.height = "37vh"
    }

    //creates register ui
    register() {

        document.getElementById("options").style.height = "44vh"
        document.getElementById("options").innerHTML = layout.register

    }

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

        let status = await net.register(data)
        switch (status) {
            case "accepted":
                document.getElementById("options").innerHTML += '<p style="color:#995544;font-size:2vh;margin:0;">Request sent. Check your email to confirm your request (expires in 10 minutes)</p>'
                document.getElementById("options").style.height = "50vh"
                break;
        }


    }

    //creates statistics ui
    stats() {

        document.getElementById("options").style.height = "15vh"
        document.getElementById("options").innerHTML = `<h3>statistics</h3>
        <hr /><br />
        <p style="color:#995544">Login to view personal statistics</p>`

    }


}