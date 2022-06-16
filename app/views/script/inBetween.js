class InBetween {

    constructor(status) {

        this.local_status = status

    }

    //compares local status with given status and updates local game
    async statusCheck(status) {

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

                game.cameraManager.rotation = false
                game.camera.position.set(0, 4000, 2000)
                game.camera.lookAt(game.scene.position)

                try {
                    communication.cardsReq = false
                    cards.leave()
                } catch (error) {
                    console.log(error.message);
                }
                this.local_status = 'started'
                dice.graphicsInterface()

                game.init(await JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())))
                game.start.greeting()

                communication.posReq = true

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