class Communication {

    constructor() {

        this.usersReq = false
        this.cardsReq = false
        this.posReq = false
        this.turnReq = false

        this.localTurn = -1

    }

    stop() {

        clearInterval(this.flood)

    }

    async request_flood() {


        this.flood = setInterval(async () => {

            inBetween.statusCheck(await JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())).status)

            //reguests user array from server (from database)
            if (this.usersReq == true) {

                let users = await waitingRoom.get_users_html()
                if (users != document.getElementById('inGameUsers').innerHTML) {

                    console.log('change');
                    document.getElementById('inGameUsers').innerHTML = users

                }
            }


            //get users 
            if (this.cardsReq == true) {

                let users = await JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())).users

                console.log(users);

                for (let el of users) {

                    console.log(el);

                    if (el.hero != null) {

                        if (document.getElementById(el.hero).chosen == false) {

                            document.getElementById(el.hero).chosen = true
                            cards.revealCard(document.getElementById(el.hero), el.name)

                        }
                    }
                }
            }

            //map position from server
            if (this.posReq == true) {

                let users = await JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())).users

                //console.log(users);

                for (let el of users) {
                    for (let pawn of game.scene.children) {

                        //console.log('user: ', el.position, ' pawn ', pawn.position);
                        //console.log(pawn.name, el.name);

                        if (pawn.name == el.name) {
                            if (pawn.position != el.position && el.position != null) {

                                this.posReq = false
                                await new Move().playerMove(el.position, pawn)
                                this.posReq = true

                            }
                        }
                    }
                }
            }

            if (this.turnReq == true) {

                let turn = await JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())).nowPlays


                if (this.localTurn != turn) {

                    let users = await JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())).users

                    //update positions

                    console.log(users);

                    for (let el of users) {

                        if (el.position != null) {

                            for (let pawn of game.scene.children) {

                                if (pawn.name == el.name) {

                                    if (pawn.position.x == el.position.initial_pos.x && pawn.position.z == el.position.initial_pos.z) {

                                        console.log('haloooo!');

                                        game.move.number = el.position.number
                                        game.move.playerMove('', pawn.position, el.position.leftright, el.position.land)

                                    }
                                }

                            }

                        }


                    }


                    this.localTurn = turn

                    //check if your move
                    if (users[turn].name == await JSON.parse(await new Net().getUsername(document.cookie.split("=")[1])).username) {

                        document.getElementById('whoplays').innerText = 'You!'
                        dice.graphicsInterface()

                    } else {

                        document.getElementById('whoplays').innerText = users[turn].name

                    }





                }

            }


        }, 500)

    }

}