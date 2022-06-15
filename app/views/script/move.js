class Move {
    constructor(board, scene, instruction) {
        this.board = board
        this.scene = scene
        this.instruction = instruction
    }
    getUsername = async () => {
        return JSON.parse(await new Net().getUsername(document.cookie.split("=")[1])).username
    }
    move = async (number) => {
        for (let i = 1; i <= this.scene.children.length - 1; i++) {
            if (this.scene.children[i].name == await this.getUsername()) {
                for (let j = 0; j < this.scene.children[0].children.length; j++) {
                    if (this.scene.children[0].children[j].position.x == this.scene.children[i].position.x && this.scene.children[0].children[j].position.z == this.scene.children[i].position.z) {

                        let x = parseInt((this.scene.children[0].children[j].name).slice(2))
                        let y = parseInt((this.scene.children[0].children[j].name).slice(2))
                        console.log(this.board.first_land[x][y])
                        for (let v = 0; v < number; v++) {
                            if (this.board.first_land[x - 1][y] != 0) {
                                this.scene.children[i].position.set(this.instruction[this.board.first_land[x][y]].position.x, this.instruction[this.board.first_land[x][y]].position.z)
                            }
                        }





                        // for (let v = 0; v < this.scene.children[0].children.length; v++) {
                        //     if (this.scene.children[0].children[v].name == `${parseInt((this.scene.children[0].children[j].name).slice(0, 2)) - number},6`) {
                        //         this.scene.children[i].position.x = this.scene.children[0].children[v].position.x
                        //         this.scene.children[i].position.z = this.scene.children[0].children[v].position.z
                        //         console.log(this.board.first_land)

                        //     }

                        // }
                    }
                }
            }
        }

    }
}
