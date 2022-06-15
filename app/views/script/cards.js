class CardsDeck {

    constructor() {

        this.characterCards = new Array()

    }

    init() {

        this.gui()

    }

    //creates gui for card picker
    gui() {

        let cardsUi = document.createElement("div")
        cardsUi.id = "cards"
        cardsUi.innerHTML = `<header id="title"><h3>TIME TO PICK</h3></header><div id="deck"></div>`
        console.log(cardsUi)
        document.body.append(cardsUi)

        setTimeout(() => {
            document.getElementById('title').style.width = '100vw'

            setTimeout(() => {
                document.getElementById('title').children[0].style.color = "#66666699"
                document.getElementById('title').children[0].style.fontSize = "6vh"

                //add cards
                this.displayCards()

            }, 200)
        }, 100)
    }

    //displays cards on deck
    async displayCards() {

        let characters = Object.keys(heroes)

        while (characters.length > 0) {

            let card = document.createElement('div')
            let index = Math.floor(Math.random() * characters.length)
            let hero = characters[index]
            characters[index] = characters[characters.length - 1]
            characters.pop()

            card.onclick = async () => {
                card.innerHTML = `<p>${hero}</p>`
                await game.sleep(1000)
                game.start.assignHero(hero)
            }

            document.getElementById('deck').append(card)

        }

        for (let i = 0; i < document.getElementById('deck').children.length; i++) {
            await game.sleep(100)
            document.getElementById('deck').children[i].style.top = '0vh'
        }

    }
}