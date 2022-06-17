class PlayersBoard {

    async gui() {

        let users = JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())).users

        let div = document.createElement('div')

        for (user of users) {

            let tale = document.createElement('div')
            div.classList.add('playertile')

        }

    }

}