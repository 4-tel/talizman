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


}