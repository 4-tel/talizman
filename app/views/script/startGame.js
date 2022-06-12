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
        for (let i = 0; i < Object.keys(champions).length; i++) {
            let card = `<div onclick="game.start.revail(${i})"id="card${i}">`
            time_To_Pick.innerHTML += (card)
        }
        document.getElementById("game").appendChild(time_To_Pick)
    }


    greeting = (hero) => {
        let greeting = document.createElement("h1")
        greeting.innerHTML = `Hello ${this.username}! You play as ${hero}`
        document.getElementById("game").appendChild(greeting)
    }


    revail = async (nr) => {
        document.getElementById(`card${nr}`).innerHTML = Object.keys(this.champion_pool.get())[nr]
        await game.sleep(1000)
        console.log("aaa")
        document.getElementById("cardsMenu").parentNode.removeChild(document.getElementById("cardsMenu"))
        let hero = Object.values(this.champion_pool.get())[nr].name
        this.greeting(hero)
    }

}