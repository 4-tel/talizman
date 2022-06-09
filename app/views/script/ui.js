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
                        console.log("join");
                        this.clearChosen(el)
                        this.joinGame()
                    }
                    break;
                case "login":
                    el.onclick = () => {
                        console.log("login");
                        this.clearChosen(el)
                        this.login()
                    }
                    break;
                case "register":
                    el.onclick = () => {
                        console.log("register");
                        this.clearChosen(el)
                        this.register()
                    }
                    break;
                case "statistics":
                    el.onclick = () => {
                        console.log("stats");
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
        document.getElementById("options").innerHTML = `<h3>join game</h3>
        <hr /><br />
        <p style="color:#995544">You play as guest</p>
        <div style="position:relative">
            <label for="idJoin">Join game by id: </label>
            <input type="text" id="idJoin" name="idJoin">
            <p>leave empty to join any available game</p>
        </div>
        <div style="position:relative">
            <label for="guestName">Temporary name: </label>
            <input type="text" id="guestName" name="guestName">
            <p>leave empty for default guest name</p>
        </div>
        <hr style="margin-top:1vh;margin-bottom:1vh">
        <button id="joinGame">search game</button>`

    }

    //creates login ui
    login() {

        document.getElementById("options").style.height = "30vh"
        document.getElementById("options").innerHTML = `<h3>login</h3>
        <hr /><br />
        <div style="position:relative">
            <label for="username">Username: </label>
            <input type="text" id="username" name="username">
        </div>
        <div style="position:relative">
            <label for="passwd">Password: </label>
            <input type="password" id="passwd" name="passwd">
        </div>
        <button id="login" onclick="ui.loginInvalid()">login</button>`

    }

    loginInvalid() {
        document.getElementById("options").innerHTML += `<p style="color:#995544;font-size:2vh">Invalid login<br/>if you don't have an account yet, register first</p>`
        document.getElementById("options").style.height = "37vh"
    }

    //creates register ui
    register() {

        document.getElementById("options").style.height = "44vh"
        document.getElementById("options").innerHTML = `<h3>register</h3>
        <hr /><br />
        <div style="position:relative">
            <label for="username">Username: </label>
            <input type="text" id="username" name="username">
        </div>
        <div style="position:relative">
            <label for="username">Email: </label>
            <input type="email" id="email" name="email">
        </div>
        <div style="position:relative">
            <label for="passwd">Password: </label>
            <input type="password" id="passwd" name="passwd">
        </div>
        <div style="position:relative">
            <label for="passwd">Confirm password: </label>
            <input type="password" id="confPasswd" name="passwd">
        </div>
        <button id="register" onclick="">register</button>`

    }

    //creates statistics ui
    stats() {

        document.getElementById("options").style.height = "15vh"
        document.getElementById("options").innerHTML = `<h3>statistics</h3>
        <hr /><br />
        <p style="color:#995544">Login to view personal statistics</p>`

    }


}