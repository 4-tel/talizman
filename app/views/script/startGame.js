class StartGame {

    constructor(player) {

        this.player = player
        this.username = this.player

    }

    init() {

        cards.init()

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


    greeting = (hero) => {

        let greeting = document.createElement("h1")
        greeting.innerHTML = `Hello ${this.username}! You play as ${hero}`
        document.getElementById("game").appendChild(greeting)

    }

    //assign hero to player
    assignHero = async (name) => {

        document.getElementById('cards').remove()
        let hero = heroes[name]
        this.greeting(hero)
    }

}