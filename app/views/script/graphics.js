class Graphics {

    constructor(scene) {

        this.scene = scene

    }

    //add floor to the scene
    createFloor(texture) {

        this.texture = new THREE.TextureLoader().load(texture)
        this.texture.wrapS = THREE.RepeatWrapping
        this.texture.wrapT = THREE.RepeatWrapping
        this.texture.repeat.set(4, 6)

        this.material = new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            map: this.texture,
        });

        this.geometry = new THREE.PlaneGeometry(35000, 35000);

        this.floor = new THREE.Mesh(this.geometry, this.material)
        this.floor.position.set(0, -100, 0)
        this.floor.rotateX(Math.PI / 2)

        this.scene.add(this.floor)

    }


    //creates light soucre
    createLightSource(x, y, z) {

        this.light = new THREE.PointLight(0xffffff, 0.5)
        this.light.position.set(x, y, z)

        this.scene.add(this.light)

    }

}