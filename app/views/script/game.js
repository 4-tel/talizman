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
        this.board = new Board(this.players, this.tiles.get())
        this.board.click()
        this.scene.add(this.board.create())
        this.board.playerPlacement(this.tiles, this.scene)
        this.render()

    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        TWEEN.update();
        console.log("render leci")
    }

}