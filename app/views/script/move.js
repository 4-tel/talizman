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
                        let land = this.getLand(this.scene.children[0].children[j])
                        let current_tile = this.getTile(this.scene.children[0].children[j].name, land)
                        console.log(current_tile)
                        let left = current_tile - number >= 0 ? land[current_tile - number] : land[land.length - Math.abs(current_tile - number)]
                        let right = current_tile + number <= land.length - 1 ? land[current_tile + number] : land[0 + Math.abs(land.length - (current_tile + number))]
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
    getTile(name, land) {
        for (let i = 0; i < land.length; i++) {
            if (land[i] == name) {
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
                let material = this.getMaterial(this.scene.children[0].children[i])
                this.scene.children[0].children[i].highlight = false
                this.scene.children[0].children[i].material = material
            }
        }
    }
    getLand(land) {
        if (land.land == "hills") {
            return this.board.first_land
        }
        else if (land.land == "desert") {
            return this.board.second_land
        }
        else if (land.land == "hell") {
            return this.board.third_land
        }
    }
    getMaterial(land) {
        if (land.land == "hills") {
            return this.tiles.first_land
        }
        else if (land.land == "desert") {
            return this.tiles.second_land
        }
        else if (land.land == "hell") {
            return this.tiles.third_land
        }
    }
}
