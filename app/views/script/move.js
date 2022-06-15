class Move {
    constructor(board, scene, instruction, tiles) {
        this.board = board
        this.scene = scene
        this.instruction = instruction
        this.tiles = tiles
    }
    getUsername = async () => {
        return JSON.parse(await new Net().getUsername(document.cookie.split("=")[1])).username
    }
    move = async (number) => {
        for (let i = 1; i <= this.scene.children.length - 1; i++) {
            if (this.scene.children[i].name == await this.getUsername()) {
                for (let j = 0; j < this.scene.children[0].children.length; j++) {
                    if (this.scene.children[0].children[j].position.x == this.scene.children[i].position.x && this.scene.children[0].children[j].position.z == this.scene.children[i].position.z) {
                        let current_tile = this.getTile(this.scene.children[0].children[j].name)
                        console.log(current_tile)
                        let left = current_tile - number >= 0 ? this.board.first_land[current_tile - number] : this.board.first_land[24 - Math.abs(current_tile - number)]
                        let right = current_tile + number <= 23 ? this.board.first_land[current_tile + number] : this.board.first_land[-1 + Math.abs(24 - (current_tile + number))]
                        left = this.getTileReverse(left)
                        left.highlight = true
                        left.material = this.first_land = new THREE.MeshStandardMaterial({
                            color: 0xffff00,
                            side: THREE.DoubleSide,
                            wireframe: false,
                        })
                        right = this.getTileReverse(right)
                        right.highlight = true
                        right.material = this.first_land = new THREE.MeshStandardMaterial({
                            color: 0xffff00,
                            side: THREE.DoubleSide,
                            wireframe: false,
                        })
                    }
                }
            }
        }

    }
    getTile(name) {
        for (let i = 0; i < this.board.first_land.length; i++) {
            if (this.board.first_land[i] == name) {
                return i
            }
        }
    }
    getTileReverse(name) {
        for (let i = 0; i < this.scene.children[0].children.length; i++) {
            if (this.scene.children[0].children[i].name == name) {
                return this.scene.children[0].children[i]
            }
        }
    }
    async playerMove(tile) {
        for (let i = 1; i <= this.scene.children.length - 1; i++) {
            if (this.scene.children[i].name == await this.getUsername()) {
                this.scene.children[i].position.x = tile.position.x
                this.scene.children[i].position.z = tile.position.z
                this.tilesBack()

            }
        }
    }
    tilesBack() {
        for (let i = 0; i < this.scene.children[0].children.length; i++) {
            if (this.scene.children[0].children[i].highlight == true) {
                this.scene.children[0].children[i].highlight = false
                this.scene.children[0].children[i].material = this.tiles.first_land
            }
        }
    }
}
