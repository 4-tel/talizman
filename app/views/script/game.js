class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0x0fffff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("game").append(this.renderer.domElement);
        this.camera.position.set(3000, 2000, 3000)
        this.camera.lookAt(this.scene.position)

        this.tiles = new Models()
        this.board = new Board(0, this.tiles.get())
        this.scene.add(this.board.create())
        this.render()
    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }
}