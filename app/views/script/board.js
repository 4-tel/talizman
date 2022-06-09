class Board {
    constructor(players) { //players rozmieszcza graczy na pozycjach startowych
        this.players = players
        this.board = new THREE.Object3D()

        //materiały krain
        this.first_land = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
            wireframe: false
        })
        this.second_land = new THREE.MeshBasicMaterial({
            color: 0x995544,
            side: THREE.DoubleSide,
            wireframe: false
        })
        this.third_land = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
            wireframe: false
        })
    }
    create() {

    }
}