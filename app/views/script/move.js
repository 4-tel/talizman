class Move {
    constructor(board, scene, instruction, tiles) {
        this.board = board
        this.scene = scene
        this.instruction = instruction
        this.tiles = tiles
        this.number = 0
    }
    getUsername = async () => {
        console.log(JSON.parse(await new Net().getUsername(document.cookie.split("=")[1])).username)
        return JSON.parse(await new Net().getUsername(document.cookie.split("=")[1])).username
    }
    move = async (number) => {
        this.number = number
        for (let i = 1; i <= this.scene.children.length - 1; i++) {
            if (this.scene.children[i].name == await this.getUsername()) {
                for (let j = 0; j < this.scene.children[0].children.length; j++) {
                    if (this.scene.children[0].children[j].position.x == this.scene.children[i].position.x && this.scene.children[0].children[j].position.z == this.scene.children[i].position.z) {
                        let land = this.getLand(this.scene.children[0].children[j].land)
                        let current_tile = this.getTile(this.scene.children[0].children[j].name, land)
                        console.log(current_tile)
                        let left = current_tile - number >= 0 ? land[current_tile - number] : land[land.length - Math.abs(current_tile - number)]
                        let right = current_tile + number <= land.length - 1 ? land[current_tile + number] : land[0 + Math.abs(land.length - (current_tile + number))]
                        left = this.getTileReverse(left)
                        left.highlight = true
                        left.leftright = "left"
                        left.material = this.first_land = new THREE.MeshStandardMaterial({
                            color: 0xffff00,
                            side: THREE.DoubleSide,
                            wireframe: false,
                        })
                        right = this.getTileReverse(right)
                        right.highlight = true
                        right.leftright = "right"
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
    getMyPosition(pos) {
        for (let i = 0; i < this.scene.children[0].children.length; i++) {
            if (this.scene.children[0].children[i].position.x == pos.x && this.scene.children[0].children[i].position.z == pos.z) {
                return this.scene.children[0].children[i].name
            }
        }
    }

    //movement of pawn
    //input : tile.position, player, tile.leftright, tile.land
    async playerMove(player, side, place) {

        return new Promise(async (resolve) => {

            let whereAmI = player.position

            if (side == "left") {
                for (let i = 0; i < this.number; i++) {
                    console.log(whereAmI)
                    console.log(player)
                    let name = this.getMyPosition(whereAmI)
                    let where = this.getLand(place)
                    let current_tile = this.getTile(name, where)
                    let left = current_tile - 1 >= 0 ? where[current_tile - 1] : where[where.length - Math.abs(current_tile - 1)]
                    let to = this.getTileReverse(left)

                    await game.sleep(100)

                    whereAmI.x = to.position.x
                    whereAmI.z = to.position.z


                    try {
                        this.tilesBack()
                    } catch (e) {
                        null
                    }
                }
                resolve(this.getTileReverse(this.getMyPosition(whereAmI)))
            }
            else if (side == "right") {
                for (let i = 0; i < this.number; i++) {
                    console.log(whereAmI)
                    console.log(player)
                    let name = this.getMyPosition(whereAmI)
                    let where = this.getLand(place)
                    let current_tile = this.getTile(name, where)
                    let right = current_tile + 1 <= where.length - 1 ? where[current_tile + 1] : where[0 + Math.abs(where.length - (current_tile + 1))]
                    let to = this.getTileReverse(right)
                    console.log(to)
                    console.log("333")
                    await game.sleep(100)
                    console.log(whereAmI)
                    whereAmI.x = to.position.x
                    whereAmI.z = to.position.z
                    console.log("aaaa")

                    try {
                        this.tilesBack()
                    } catch (e) {
                        null
                    }
                }
                resolve(this.getTileReverse(this.getMyPosition(whereAmI)))
            }
            else if (side == "travel") {
                whereAmI.x = pos.x
                whereAmI.y = pos.y + 50
                whereAmI.z = pos.z
                resolve(null)
            }

        })

    }

    getLand(land) {
        if (land == "hills") {
            return this.board.first_land
        }
        else if (land == "desert") {
            return this.board.second_land
        }
        else if (land == "hell") {
            return this.board.third_land
        }
    }

    tilesBack() {

        for (let i = 0; i < this.scene.children[0].children.length; i++) {
            if (this.scene.children[0].children[i].highlight == true) {
                let material = this.getMaterial(this.scene.children[0].children[i].land)
                this.scene.children[0].children[i].highlight = false
                this.scene.children[0].children[i].leftright = null
                this.scene.children[0].children[i].material = material
            }
        }
    }
    getMaterial(land) {
        if (land == "hills") {
            return this.tiles.first_land
        }
        else if (land == "desert") {
            return this.tiles.second_land
        }
        else if (land == "hell") {
            return this.tiles.third_land
        }
    }
}
