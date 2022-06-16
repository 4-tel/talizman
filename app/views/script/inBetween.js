class InBetween {

    constructor(status) {

        this.local_status = status

    }

    //compares local status with given status and updates local game
    statusCheck(status) {

        if (status != this.local_status) {

            //stage await
            if (status == 'await') {

                this.local_status = 'await'
                waitingRoom.init()

            }

            //stage cards
            if (status == 'cards') {

                try {
                    communication.usersReq = false
                    waitingRoom.leave()
                } catch (error) {
                    console.log(error.message);
                }
                this.local_status = 'cards'
                cards.init()

            }

            //stage started
            if (status == 'started') {

                try {
                    communication.cardsReq = false
                    cards.leave()
                } catch (error) {
                    console.log(error.message);
                }
                this.local_status = 'started'

            }

            //stage finished
            if (status == 'finished') {

            }

        }

        else {

            return 'upToDate'

        }


    }

}