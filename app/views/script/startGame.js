class StartGame {
    constructor(player) {
        this.player = player
        this.username = this.player.username
        this.champion_pool = new Heroes()
        this.choseYourChampion(this.champion_pool.get())
        //this.greeting()
    }
    choseYourChampion = (champions) => {
        let time_To_Pick = document.createElement("div")
        time_To_Pick.style = 'position: absolute; width: 100%; height: 100%; background-color: green; z-index: 2;'
        for (let i = 0; champions.length; i++) {
            let card = `<div id="card" style = "float: "left"; background-color: "red"; width= 300px; height = 300px;">`
            time_To_Pick.appendChild(card)
        }
        document.getElementById("game").appendChild(time_To_Pick)
    }
    greeting = () => {
        document.getElementById("game").innerHTML += `<h1>Hello ${this.username}! You play as ${this.hero}`
    }
}