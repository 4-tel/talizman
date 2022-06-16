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
        cardsUi.innerHTML = `<header id="title"><h3 id="hightime">TIME TO PICK</h3></header><p style="margin:0" id="whoseTurn"></p><div id="deck"></div>`
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

        this.index = 0
        this.players = new Array()

        for (let user of JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())).users) {
            this.players.push(user.name)
        }

        document.getElementById('whoseTurn').innerText = `${this.players[this.index]}'s time to pick`

        //if your time to choose
        if (this.players[this.index] == JSON.parse(await net.getUsername(document.cookie.split('=')[1])).username) {

            document.getElementById('hightime').style.color = "#552211"
            document.getElementById('whoseTurn').innerText = 'Your time to pick'

        } else {
            document.getElementById('hightime').style.color = '#666666'
        }

        //start server requests
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

                    if (this.players[this.index] == data.username) {
                        if (await net.asignHero(data.username, hero, data.session) == 'success') {

                            //if player is the last one to choose - change session status
                            if (this.index == this.players.length - 1) {

                                setTimeout(async () => {
                                    net.changeSessionStatus('started', await waitingRoom.get_session_data(document.cookie.split('=')[1]))
                                }, 1000)
                            }

                            user.hero = hero
                            this.revealCard(card, data.username)
                            card.chosen = true

                        }
                    }


                }

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

        this.index++

        //if everybody chosed
        if (this.index == this.players.length) {

            console.log('chosen');

            setTimeout(() => {

                //HERE

                // game.start.assignHero(user.hero) //game starting function
            }, 1000)
        }


        document.getElementById('whoseTurn').innerText = `${this.players[this.index]}'s time to pick`


        //if your time to choose
        if (this.players[this.index] == JSON.parse(await net.getUsername(document.cookie.split('=')[1])).username) {

            document.getElementById('whoseTurn').innerText = 'Your time to pick'
            document.getElementById('hightime').style.color = "#552211"

        } else {
            document.getElementById('hightime').style.color = '#666666'
        }

    }

    //leave cards part of the game
    async leave() {

        document.getElementById('cards').remove()

    }

}