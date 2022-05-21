class Ui {

    constructor() {
        this.loginBackgrounds = ['village.jpg', 'castle.jpg', 'catacombs.jpg', 'dragon.jpg', 'statue.jpg']
    }

    //starts all methods required to login ui
    //no input
    //no output

    loginUi() {
        this.loginImages(0)
        this.loginPanel()
    }

    //login background images
    //input: desired image index - integer
    //no output

    loginImages(i) {

        console.log(`textures/${this.loginBackgrounds[i]}`);

        document.getElementById("image").setAttribute("src", `textures/${this.loginBackgrounds[i]}`)

        i += 1
        if (i > this.loginBackgrounds.length) { i = 0 }
        let margin = 1

        this.interval = setInterval(() => {
            document.getElementById("image").style.marginTop = margin + "px"
            margin -= 0.2

            if (Math.abs(margin) > document.getElementById("image").offsetHeight - document.getElementById("background").offsetHeight) {
                clearInterval(this.interval)
                this.loginImages(i)
            }

        }, 10)


    }

    //displays and handles login panel
    //no input
    //no output

    loginPanel() {

        document.getElementById("unameSubmit").onclick = () => { net.joinGameRequest(document.getElementById("username").value, null) }

    }

    //displays message in login window
    //input is a message string
    //no output

    loginMsg(message) {

        document.getElementById("loginMsg").innerText = message

    }
}