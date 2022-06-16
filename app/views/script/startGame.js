class StartGame {

    constructor(player) {

        this.player = player
        this.username = this.player

    }


    // choseYourChampion = (champions) => {

    //     let time_To_Pick = document.createElement("div")
    //     time_To_Pick.id = "cardsMenu"
    //     time_To_Pick.innerHTML = `<p>Time to pick</p>`
    //     let cards = document.createElement("div")
    //     cards.id = "cards"
    //     time_To_Pick.append(cards)

    //     for (let i = 0; i < Object.keys(champions).length; i++) {

    //         let card = `<div><img src="textures/card_back.jpg" onclick="game.start.reveal(${i})"></div>`
    //         cards.innerHTML += (card)

    //     }

    //     document.getElementById("game").appendChild(time_To_Pick)

    // }


    //displays greeting header with username and choosen character
    async greeting() {

        let data = JSON.parse(await net.getUsername(document.cookie.split('=')[1]))
        let users = JSON.parse(await net.sessionInfo(data.session)).users
        let hero

        for (let el of users) {
            if (el.name == data.username) {
                hero = el.hero
            }
        }

        let greeting = document.createElement("h1")
        greeting.id = 'greeting'
        greeting.innerHTML = `Hello <span style="color:#663322">${data.username}</span>! You play as <span style="color:#552222;font-family:Cardinal">${hero}</span>`
        document.getElementById("game").appendChild(greeting)

    }

}