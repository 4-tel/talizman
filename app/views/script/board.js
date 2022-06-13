class Board {
    constructor(instruction) { //players rozmieszcza graczy na pozycjach startowych
        this.instruction = instruction
        this.board = new THREE.Object3D()


    }

    create() {
        for (let i = 0; i < 49; i++) {
            let tile = new THREE.Mesh(new THREE.BoxGeometry(this.instruction[i].width, 50, this.instruction[i].height), this.instruction[i].material)
            tile.name = `${i + 10},${this.instruction[i].orientation}`
            tile.position.set(this.instruction[i].position.x, this.instruction[i].position.y, this.instruction[i].position.z)
            this.board.add(tile)
        }
        return (this.board)
    }
    playerPlacement = (tiles, game) => {

        this.players = new Temp()

        for (let i = 0; i < this.players.tabela.length; i++) {

            let player = new THREE.Mesh(new THREE.CylinderGeometry(100, 100, 100, 100), tiles.player_temp)
            player.name = `${this.players.tabela[i].token}`//tymczasowa
            //player.name = `${await new Net().getUsername(this.players.tabela[i].token)}`
            player.position.set(this.instruction[this.players.tabela[i].current_hero.starting_tile].position.x, this.instruction[this.players.tabela[i].current_hero.starting_tile].position.y + 100, this.instruction[this.players.tabela[i].current_hero.starting_tile].position.z)
            game.add(player)

        }

    }
    click = () => {
        this.raycaster = new THREE.Raycaster()
        this.mouseVector = new THREE.Vector2()
        document.getElementById("game").addEventListener("mousedown", (event) => {

            this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1

            this.raycaster.setFromCamera(this.mouseVector, game.camera);
            this.intersects = this.raycaster.intersectObjects(game.scene.children[0].children);
            switch (event.which) {
                case 1:
                    if (this.intersects.length > 0) {
                        console.log(this.intersects[0])
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
}