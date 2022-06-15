class Communication {

    constructor() {

        this.usersReq = false
        this.cardsReq = false

    }

    stop() {

        clearInterval(this.flood)

    }

    async request_flood() {

        this.flood = setInterval(async () => {

            //reguests user array from server (from database)
            if (this.usersReq == true) {

                let users = await waitingRoom.get_users_html()
                if (users != document.getElementById('inGameUsers').innerHTML) {

                    console.log('change');

                    document.getElementById('inGameUsers').innerHTML = users

                }

                if (await JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())).status != 'await') {

                    waitingRoom.leave()
                    this.userReq = false

                }

            }


            //get users 
            if (this.cardsReq == true) {

                let users = await JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())).users

                console.log(users);

                for (let el of users) {

                    if (el.hero != null) {

                        if (document.getElementById(el.hero).chosen == false) {

                            document.getElementById(el.hero).chosen = true
                            cards.revealCard(document.getElementById(el.hero), el.user)

                        }
                    }
                }
            }


        }, 500)

    }

}