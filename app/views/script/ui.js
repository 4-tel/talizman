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
                        this.account()
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
            document.getElementById("options").children[3].innerText = `You play as ${JSON.parse(await net.getUsername(user.token)).username}`
        }

    }

    //creates login ui
    login() {
        document.getElementById("options").style.height = "30vh"
        document.getElementById("options").innerHTML = layout.login

    }

    //creates register ui
    register() {

        document.getElementById("options").style.height = "44vh"
        document.getElementById("options").innerHTML = layout.register

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

    //creates an account ui
    async account() {
        document.getElementById("options").style.height = '20vh'
        document.getElementById("options").innerHTML = layout.account
        document.getElementById("options").children[3].innerText = `Hello ${JSON.parse(await net.getUsername(user.token)).username}!`

    }

}