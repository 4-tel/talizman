class Ui {

    init() {
        this.chooseMenuOption()
        this.volume()
    }

    //clear volume
    volume() {

        this.state = ["down", "mute", "up"]
        this.stateIndex = 0

        document.getElementById("volume").onclick = () => {

            switch (this.state[this.stateIndex]) {
                case "down":
                    console.log("down");
                    document.getElementById("volume").src = '/textures/volume_down.png'
                    audio.volume = 0.5
                    break;
                case "mute":
                    console.log("mute");
                    document.getElementById("volume").src = '/textures/volume_mute.png'
                    audio.volume = 0
                    break;
                case "up":
                    console.log("up");
                    document.getElementById("volume").src = '/textures/volume_up.png'
                    audio.volume = 1
                    break;
            }

            this.stateIndex += 1
            if (this.stateIndex > 2) {
                this.stateIndex = 0
            }

        }

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

            let stats = JSON.parse(await net.getStats())
            console.log(stats);
            document.getElementById("options").style.height = "25vh"
            document.getElementById("options").innerHTML = `<h3>statistics</h3>
            <hr /><br />
            <p style="margin:1vh;">Games played: ${Object.values(stats[0])[0]}<br/>Games won: ${Object.values(stats[1])[0]}<br/>Games lost: ${Object.values(stats[2])[0]}<br/></p>`
        }

    }

    //creates an account ui
    async account() {
        document.getElementById("options").style.height = '28vh'
        document.getElementById("options").innerHTML = layout.account
        document.getElementById("options").children[3].innerText = `Hello ${JSON.parse(await net.getUsername(user.token)).username}!`

    }

    joinFail() {

        document.getElementById('options').innerHTML += "unexpected problem with session join occured :/"
        document.getElementById('options').style.height = '32vh'

    }

}