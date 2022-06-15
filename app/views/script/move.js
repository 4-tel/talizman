class Move {
    constructor(board, scene) {
        this.board = board
        this.scene = scene
    }
    getUsername = async () => {
        return JSON.parse(await new Net().getUsername(document.cookie.split("=")[1])).username
    }
    move = async (number) => {
        for (let i = 1; i <= this.scene.children.length - 1; i++) {
            if (this.scene.children[i].name == await this.getUsername()) {
                for (let j = 0; j < this.scene.children[0].children.length; j++) {
                    if (this.scene.children[0].children[j].position.x == this.scene.children[i].position.x && this.scene.children[0].children[j].position.z == this.scene.children[i].position.z) {


                        for (let v = 0; v < this.scene.children[0].children.length; v++) {
                            if (this.scene.children[0].children[v].name == `${parseInt((this.scene.children[0].children[j].name).slice(0, 2)) - number},6`) {
                                this.scene.children[i].position.x = this.scene.children[0].children[v].position.x
                                this.scene.children[i].position.z = this.scene.children[0].children[v].position.z

                            }

                        }
                    }
                }
            }
        }

    }
}
