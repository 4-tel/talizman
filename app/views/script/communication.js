class Communication {

    constructor() {

        this.usersReq = false

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

        }, 500)

    }

}