class PlayersBoard {


    async gui() {

        let data = await this.get_data()

        let div = document.createElement('div')
        div.id = 'playerboard'

        for (let el of data) {

            let container = document.createElement('div')
            container.setAttribute('style', '--top(30)')
            container.innerHTML = `<h3>${el.username} - ${el.hero}</h3><ul><li>health: ${el.health}</li><li>strength: ${el.strength}</li><li>luck: ${el.luck}</li></ul>`
            div.append(container)
        }

        document.body.append(div)

    }


    async get_data() {

        let output = new Array()

        let users = JSON.parse(await net.sessionInfo(await waitingRoom.get_session_data())).users

        for (user of users) {

            console.log(user);

            output.push(
                {
                    username: user.name,
                    hero: user.hero,
                    health: heroes[user.hero].stats.health,
                    strength: heroes[user.hero].stats.strength,
                    luck: heroes[user.hero].stats.luck
                }
            )
        }

        return output

    }

    async randomEvent() {

        this.eventnames = ['wolf', 'goblin', 'bonus', 'health']
        this.eventdescriptions = ['You stumbled upon a lethal wolf. Fight it to survive', 'You met a goblin. It really wants your blood', 'You found a power source. Choose statistic to boost', 'You found an apple tree. You can rest here. Bonus to health']
        this.eventimage = ['/textures/wolf.jpg', '/textures/goblin.jpg', '/textures/bonus.jpg', '/textures/apple.jpg']

        let random = Math.floor(Math.random() * this.eventnames.length)

        let action = document.createElement('div')
        action.id = 'action'
        action.innerHTML = `<h1 id="actionname">${this.eventnames[random]}</h1><p id="actiondescription">${this.eventdescriptions[random]}</p><img width="100%" src="${this.eventimage[random]}"></img>`
        if (this.eventnames[random] == 'wolf' || this.eventnames[random] == 'goblin') {
            action.innerHTML += '<p onclick="playersBoard.fight(2)" class="confirm">[ fight ]</p>'
        }

        else if (this.eventnames[random] == 'health') {

            action.innerHTML += `<p class="confirm" onclick="playersBoard.statBonus('health',1)">[ ok ]</p>`

        }
        else {

            action.innerHTML += `<p onclick="playersBoard.statBonus('mana',1)" class="confirm">[ mana ]</p><p onclick="playersBoard.statBonus('strength',1)" class="confirm">[ strength ]</p>`

        }


        document.body.append(action)


    }

    async statBonus(name, value) {

        console.log('hejka');

        let message = '+' + value + ' to ' + name

        alert(message)
        document.getElementById('action').remove()

    }

    async fight(chances) {

        if (Math.floor(Math.random() * 2) == 1) {
            alert('you won!')
        } else {
            alert('you lost')
        }

        document.getElementById('action').remove()

    }

}