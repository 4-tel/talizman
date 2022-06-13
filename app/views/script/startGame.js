class StartGame {


    constructor(player) {
        this.player = player
        this.username = this.player
        this.champion_pool = new Heroes()
        this.choseYourChampion(this.champion_pool.get())
    }


    choseYourChampion = (champions) => {
        let time_To_Pick = document.createElement("div")
        time_To_Pick.id = "cardsMenu"
        time_To_Pick.innerHTML = `<p>Time to pick</p>`
        let cards = document.createElement("div")
        cards.id = "cards"
        time_To_Pick.append(cards)
        for (let i = 0; i < Object.keys(champions).length; i++) {
            let card = `<div><img src="textures/card_back.jpg" onclick="game.start.reveal(${i})"></div>`
            cards.innerHTML += (card)
        }
        document.getElementById("game").appendChild(time_To_Pick)
    }


    greeting = (hero) => {
        let greeting = document.createElement("h1")
        greeting.innerHTML = `Hello ${this.username}! You play as ${hero}`
        document.getElementById("game").appendChild(greeting)
    }


    reveal = async (nr) => {

        document.getElementById("cards").children[nr].children[0].style.width = '0%'
        document.getElementById("cards").children[nr].children[0].style.marginLeft = '15%'
        document.getElementById("cards").children[nr].children[0].style.marginRight = '15%'

        setTimeout(() => {

            document.getElementById("cards").children[nr].innerHTML = `<div id="card${nr}" style="background-color:white;border:1px solid black;height:100%;width:0vw;position:absolute;left:50%;transform:translate(-50%);transition: all 0.2s;"></div>`
            setTimeout(() => {
                document.getElementById("cards").children[nr].children[0].style.width = "13.8vw"
                document.getElementById(`card${nr}`).innerHTML = Object.keys(this.champion_pool.get())[nr]
            }, 50)

        }, 250)

        await game.sleep(3000)
        document.getElementById("cardsMenu").parentNode.removeChild(document.getElementById("cardsMenu"))
        let hero = Object.values(this.champion_pool.get())[nr].name
        this.greeting(hero)
    }

}