class StartGame {
    constructor(player) {
        this.player = player
        this.username = this.player
        this.champion_pool = new Heroes()
        this.choseYourChampion(this.champion_pool.get())
    }
    choseYourChampion = (champions) => {
        let time_To_Pick = document.createElement("div")
        time_To_Pick.id = "champion_select"
        time_To_Pick.style = 'position: absolute; top: 0px;width: 100%; height: 100%; background-color: #00ff0050; z-index: 2;'
        for (let i = 0; i < Object.keys(champions).length; i++) {
            let card = `<div onclick="game.start.revail(${i})"id="card${i}" style = "float: left; background-color: red; width: 300px; height: 300px; margin: 60px;">`
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
        document.getElementById("champion_select").parentNode.removeChild(document.getElementById("champion_select"))
        let hero = Object.values(this.champion_pool.get())[nr].name
        this.greeting(hero)
    }
}