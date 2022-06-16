class Dice {

    constructor() {

        this.throw = ['dice/1.mp4', 'dice/2.mp4', 'dice/3.mp4', 'dice/4.mp4', 'dice/5.mp4', 'dice/6.mp4']
        this.words = ['one', 'two', 'a three', 'a four', 'five', 'a six']

    }


    graphicsInterface() {

        this.gui = document.createElement('div')
        this.gui.id = 'dice'
        this.gui.innerHTML = `<h3>Roll a die</h3><img src="textures/dice.png" onclick="dice.throwDice()">`

        document.body.append(this.gui)

        setTimeout(() => {
            document.getElementById('dice').style.bottom = "35vh"
        }, 100)

    }

    async throwDice() {

        document.getElementById('dice').remove()
        this.value = Math.floor(Math.random() * 1)

        let div = document.createElement('div')
        div.id = 'video'
        div.innerHTML = `<video width="${window.innerWidth * 0.8}" autoplay muted>
        <source id="throw" src="${this.throw[this.value]}" type="video/mp4">Your browser does not support HTML video.</video>`

        document.body.append(div)

        await game.sleep(1500)
        let outcome = document.createElement('div')
        outcome.id = 'outcome'
        outcome.innerHTML = `<h3 >It's ${this.words[this.value]}!</h3><p onclick="dice.ok()">[ ok ]</p>`
        document.getElementById('video').append(outcome)
        game.move.move(this.value + 1)
        await game.sleep(1000)
    }

    ok() {

        document.getElementById("video").remove()

        this.graphicsInterface()

    }



}