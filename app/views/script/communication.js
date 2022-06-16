class Communication {

    constructor() {

        this.usersReq = false
        this.cardsReq = false
        this.posReq = false

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

                console.log(users);

                for (let el of users) {
                    for (let pawn of game.scene.children) {

                        console.log('user: ', el.position, ' pawn ', pawn.position);
                        console.log(pawn.name, el.name);

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


        }, 500)

    }

}