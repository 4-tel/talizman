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

            }

        }, 500)

    }

}