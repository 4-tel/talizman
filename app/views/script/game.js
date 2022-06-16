class Game {

    constructor() {

        //scene
        this.scene = new THREE.Scene();

        //renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("game").append(this.renderer.domElement);

        //camera
        this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100000);
        this.camera.position.set(0, 4000, 2000)
        this.camera.lookAt(this.scene.position)
        this.cameraManager = new Camera(this.camera, this.scene) //custom camera managment

        this.cameraManager.rotation = true

        //create board
        console.log(this.session)
        this.tiles = new Models()
        this.board = new Board(this.tiles.get())
        this.board.click()
        this.scene.add(this.board.create())
        this.move = new Move(this.board, this.scene, this.tiles.get(), this.tiles)
        // this.board.playerPlacement(this.tiles, this.scene)

        //axes 
        this.axes = new THREE.AxesHelper(10000)
        // this.scene.add(this.axes)


        //graphics controller
        this.graphics = new Graphics(this.scene)
        this.graphics.createFloor('/textures/cobblestone.jpg')
        this.graphics.createLightSource(100, 1000, 100)


        //change aspect on window resize
        window.onresize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }

        //render
        this.render()
    }


    async init(session) {

        console.log(session)
        this.board.playerPlacement(this.tiles, this.scene, session.users)
        this.start = new StartGame()

    }


    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        TWEEN.update();
        if (this.cameraManager.rotation == true) {
            this.cameraManager.moveAround(1) //argument: speed
        }
    }

    sleep = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    action = async (tile, player) => {

        console.log('djaskdlasjkasjdlasjdkjakdjkasdjkasjdklasjdjaskljl');

        for (let i = 0; i < tile.actions.length; i++) {
            if (tile.actions[i].name == "travel") {
                let where = this.move.getTileReverse(tile.actions[i].destination)
                await this.move.playerMove(where.position, player, "travel", where.land)
                await this.sleep(1000)
            }
            else if (tile.actions[i].name == "win") {
                document.body.innerHTML = "<h1>YOU WIN</h1>"
            }
        }
    }

    // roll = async () => {
    //     let outcome
    //     for (let i = 0; i < 50; i++) {
    //         outcome = Math.floor(Math.random() * 6) + 1
    //         let display = document.getElementById("die")
    //         display.innerHTML = `<button style="position: relative; left: 10%;" onclick="game.roll()">Roll!</button>
    //     <p style="position: relative; left: 30%;">${outcome}</p>`
    //         await this.sleep(20)
    //     }

    // }
}