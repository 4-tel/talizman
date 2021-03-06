class Board {
    constructor(instruction) { //players rozmieszcza graczy na pozycjach startowych
        this.instruction = instruction
        this.board = new THREE.Object3D()
        this.first_land = ["0,0", "0,1", "0,2", "0,3", "0,4", "0,5", "0,6", "1,6", "2,6", "3,6", "4,6", "5,6", "6,6", "6,5", "6,4", "6,3", "6,2", "6,1", "6,0", "5,0", "4,0", "3,0", "2,0", "1,0"]
        this.second_land = ["1,1", "1,2", "1,3", "1,4", "1,5", "2,5", "3,5", "4,5", "5,5", "5,4", "5,3", "5,2", "5,1", "4,1", "3,1", "2,1"]
        this.third_land = ["2,2", "2,3", "2,4", "3,4", "4,4", "4,3", "4,2", "3,2"]

        this.number = null

    }

    create() {
        for (let i = 0; i < 49; i++) {
            let tile = new THREE.Mesh(new THREE.BoxGeometry(this.instruction[i].width, 50, this.instruction[i].height), this.instruction[i].material)
            tile.name = `${Math.floor(i / 7)},${i % 7}`
            tile.highlight = false
            tile.leftright = null
            tile.actions = this.instruction[i].actions
            tile.place = this.instruction[i].name
            tile.land = `${this.instruction[i].material.name}`
            tile.position.set(this.instruction[i].position.x, this.instruction[i].position.y, this.instruction[i].position.z)
            this.board.add(tile)
        }
        return (this.board)
    }
    textures() {
        let all = new THREE.Object3D
        let one = new THREE.Mesh(new THREE.BoxGeometry(4000, 2, 3000),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                //side: THREE.DoubleSide,
                wireframe: false,
                map: new THREE.TextureLoader().load("textures/talizmanFirstLand.png")
            })
        )
        one.position.set(-290, 47, -390)
        let two = new THREE.Mesh(new THREE.BoxGeometry(3060, 2, 2060),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                //side: THREE.DoubleSide,
                wireframe: false,
                map: new THREE.TextureLoader().load("textures/talizmanSecondLand.png")
            })
        )
        two.position.set(-290, 97, -390)
        let three = new THREE.Mesh(new THREE.BoxGeometry(2340, 2, 1320),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                //side: THREE.DoubleSide,
                wireframe: false,
                map: new THREE.TextureLoader().load("textures/talizmanThirdLand.jpg")
            })
        )
        three.position.set(-290, 147, -390)
        all.add(one)
        all.add(two)
        all.add(three)
        return all
    }
    playerPlacement = async (tiles, game, players) => {
        console.log(players)
        for (let i = 0; i < players.length; i++) {
            console.log(heroes[players[i].hero])
            let player = new THREE.Mesh(new THREE.CylinderGeometry(100, 100, 100, 100), tiles.player_temp)
            player.name = `${players[i].name}`
            player.haveTalisman = false
            player.position.set(this.instruction[heroes[players[i].hero].starting_tile].position.x, this.instruction[heroes[players[i].hero].starting_tile].position.y + 100 + i, this.instruction[heroes[players[i].hero].starting_tile].position.z)
            game.add(player)
        }

    }
    click = async () => {

        this.raycaster = new THREE.Raycaster()
        this.mouseVector = new THREE.Vector2()
        document.getElementById("game").addEventListener("mousedown", async (event) => {

            this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1

            this.raycaster.setFromCamera(this.mouseVector, game.camera);
            this.intersects = this.raycaster.intersectObjects(game.scene.children[0].children);
            switch (event.which) {
                case 1:
                    if (this.intersects.length > 0) {
                        console.log(this.intersects[0])
                        if (this.intersects[0].object.highlight == true) {
                            for (let i = 1; i <= game.scene.children.length - 1; i++) {
                                if (game.scene.children[i].name == await this.getUsername()) {


                                    let leftright = this.intersects[0].object.leftright
                                    let land = this.intersects[0].object.land
                                    let initial_pos = game.scene.children[i].position

                                    console.log(initial_pos);

                                    let serverPack = { initial_pos: initial_pos, leftright: leftright, land: land, number: this.number }

                                    //send position to server
                                    await net.changePlayerPosition(await this.getUsername(), serverPack, await waitingRoom.get_session_data());

                                    let position = await game.move.playerMove(this.intersects[0].object.position, game.scene.children[i].position, this.intersects[0].object.leftright, this.intersects[0].object.land)

                                    console.log(position);


                                    //send turn iteration to server
                                    new Net().iterateSessionTurn(JSON.parse(await new Net().getUsername(document.cookie.split("=")[1])).session)


                                    //look for any actions on new tile
                                    game.action(position, game.scene.children[i])
                                }
                            }

                        }
                    }
                    break
                case 2:
                    game.camera.position.set(0, 5000, 0)
                    game.camera.lookAt(game.scene.position)
                    break
                case 3:
                    if (this.intersects.length > 0) {
                        new TWEEN.Tween(game.camera.position)
                            .to({ x: this.intersects[0].object.position.x, y: game.camera.position.y, z: this.intersects[0].object.position.z }, 1000)
                            .easing(TWEEN.Easing.Linear.None)
                            .onUpdate(() => { game.camera.lookAt(game.camera.position.x, game.camera.position.y - 100, game.camera.position.z) })
                            .onComplete(() => { game.camera.lookAt(this.intersects[0].object.position) })
                            .start()
                    }
                    break
                default:
                    break
            }


        })
    }
    getUsername = async () => {
        return await JSON.parse(await new Net().getUsername(document.cookie.split("=")[1])).username
    }

}