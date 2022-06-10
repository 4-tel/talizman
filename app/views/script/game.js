class Game {

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("game").append(this.renderer.domElement);
        this.camera.position.set(0, 4000, 3000)
        this.camera.lookAt(this.scene.position)

        this.tiles = new Models()
        this.board = new Board(0, this.tiles.get())
        this.scene.add(this.board.create())
        this.render()
        this.wireframe = document.getElementById("game")
        this.wireframe.setAttribute("onmousemove", "game.wire_frame()")

    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }
    wire_frame = () => {
        if (this.tiles.third_land.wireframe == false) {
            this.tiles.third_land.wireframe = true
            this.tiles.second_land.wireframe = true
            this.tiles.first_land.wireframe = true
        }
        else {
            this.tiles.third_land.wireframe = false
            this.tiles.second_land.wireframe = false
            this.tiles.first_land.wireframe = false
        }
    }

}