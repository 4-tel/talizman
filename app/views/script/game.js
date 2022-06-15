class Game {

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0x333333);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("game").append(this.renderer.domElement);
        this.camera.position.set(0, 4000, 2000)
        this.camera.lookAt(this.scene.position)

        this.tiles = new Models()
        this.board = new Board(this.tiles.get())
        this.board.click()
        this.scene.add(this.board.create())
        this.board.playerPlacement(this.tiles, this.scene)
        this.move = new Move(this.board, this.scene)
        this.render()
        // console.log(this.scene)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        console.log(this.controls);

        // document.getElementById('game').onresize = () => {
        //     this.camera.aspect = window.innerWidth / window.innerHeight;
        //     this.camera.updateProjectionMatrix();
        //     this.renderer.setSize(window.innerWidth, window.innerHeight);
        // }

        window.onresize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }

    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        TWEEN.update();
        // this.controls.update()
    }

    //temp code
    sleep = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    roll = async () => {
        let outcome
        for (let i = 0; i < 50; i++) {
            outcome = Math.floor(Math.random() * 6) + 1
            let display = document.getElementById("die")
            display.innerHTML = `<button style="position: relative; left: 10%;" onclick="game.roll()">Roll!</button>
        <p style="position: relative; left: 30%;">${outcome}</p>`
            await this.sleep(20)
        }
        this.move.move(outcome)

    }

}