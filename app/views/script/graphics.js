class Graphics {

    constructor(scene) {

        this.scene = scene

    }

    //add floor to the scene
    createFloor(texture) {

        this.materials = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
            wireframe: true
        })

        this.geometry = new THREE.PlaneGeometry(1000, 50)

        this.floor = new THREE.Mesh(this.geometry, this.materials)
        this.floor.position.set(100, 200, 100)

        this.scene.add(this.floor)

    }

}