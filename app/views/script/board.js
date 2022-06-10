class Board {
    constructor(players, instruction) { //players rozmieszcza graczy na pozycjach startowych
        this.players = players
        this.instruction = instruction
        this.board = new THREE.Object3D()


    }

    create() {
        for (let i = 0; i < 49; i++) {
            let tile = new THREE.Mesh(new THREE.BoxGeometry(this.instruction[i].width, 50, this.instruction[i].height), this.instruction[i].material)
            tile.name = `${i}`
            tile.position.set(this.instruction[i].position.x, this.instruction[i].position.y, this.instruction[i].position.z)
            this.board.add(tile)
        }
        return (this.board)
    }
    click = () => {
        this.raycaster = new THREE.Raycaster()
        this.mouseVector = new THREE.Vector2()
        document.getElementById("game").addEventListener("mousedown", (event) => {

            this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1

            this.raycaster.setFromCamera(this.mouseVector, game.camera);
            this.intersects = this.raycaster.intersectObjects(game.scene.children[0].children);

            if (this.intersects.length > 0) {
                console.log(this.intersects[0])
                this.intersects[0].object.material = new THREE.MeshBasicMaterial({
                    color: 0x0000ff,
                    side: THREE.DoubleSide,
                    wireframe: false
                })
            }

        })
    }
}