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

        communication.cardsReq = true

        let characters = Object.keys(heroes)

        while (characters.length > 0) {

            let card = document.createElement('div')
            let index = Math.floor(Math.random() * characters.length)
            let hero = characters[index]
            card.id = hero
            characters[index] = characters[characters.length - 1]
            characters.pop()

            card.chosen = false

            card.onclick = async () => {

                if (card.chosen == false) {

                    //assigning hero in server
                    let data = JSON.parse(await net.getUsername(document.cookie.split('=')[1]))

                    if (await net.asignHero(data.username, hero, data.session) == 'success') {

                        this.revealCard(card, data.username)
                        card.chosen = true

                    }

                }
                // game.start.assignHero(hero) - game starting function

            }

            document.getElementById('deck').append(card)

        }

        for (let i = 0; i < document.getElementById('deck').children.length; i++) {
            await game.sleep(100)
            document.getElementById('deck').children[i].style.top = '0vh'
        }

    }

    async revealCard(card, player) {

        card.style.width = '0vw'

        await game.sleep(300)

        card.style.backgroundImage = 'none'

        card.innerHTML = `<p style="margin:0px;font-size:2vh;background-color:#542a8750">${player} plays as: </p>
        <p style="margin:0px;font-size:2.5vh">${card.id}</p><img src="${heroes[card.id].img}" width="100%">`
        card.style.width = '15vw'

    }
}