class Graphics {

    constructor(scene) {

        this.scene = scene

    }

    //add floor to the scene
    createFloor(texture) {

        this.material = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide });

        this.geometry = new THREE.PlaneGeometry(10000, 10000);

        this.floor = new THREE.Mesh(this.geometry, this.material)
        this.floor.position.set(0, -100, 0)
        this.floor.rotateX(Math.PI / 2)

        this.scene.add(this.floor)

    }


    //creates light soucre
    createLightSource(x, y, z) {

        this.light = new THREE.PointLight(0xffff00)
        this.light.position.set(x, y, z)

        this.scene.add(this.light)

    }

}