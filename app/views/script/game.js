class Game {

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("game").append(this.renderer.domElement);
        this.camera.position.set(0, 4000, 2000)
        this.camera.lookAt(this.scene.position)

        this.tiles = new Models()
        this.players = new Temp()
        this.start = new StartGame("maciek")
        this.board = new Board(this.players, this.tiles.get())
        this.board.click()
        this.scene.add(this.board.create())
        this.board.playerPlacement(this.tiles, this.scene)
        this.render()
        console.log(this.scene)

    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        TWEEN.update();
        console.log("render leci")
    }

    //temp code
    sleep = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    roll = async () => {
        for (let i = 0; i < 50; i++) {
            let outcome = Math.floor(Math.random() * 6) + 1
            let display = document.getElementById("die")
            display.innerHTML = `<button style="position: relative; left: 10%;" onclick="game.roll()">Roll!</button>
        <h1 style="position: relative; left: 30%;">${outcome}</h1>`
            await this.sleep(20)
        }
    }

}