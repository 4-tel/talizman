class Models {
    constructor() {
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
        this.tile_table = [
            {
                position: {
                    x: -2000,
                    y: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: -1430,
                    y: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: -860,
                    y: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: -290,
                    y: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: 280,
                    y: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: 850,
                    y: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: 1420,
                    y: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: 0,
                    y: 300
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 300,
                    y: 300
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 600,
                    y: 300
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 900,
                    y: 300
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 1200,
                    y: 300
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 1500,
                    y: 300
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 1800,
                    y: 300
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 0,
                    y: 600
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 300,
                    y: 600
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 600,
                    y: 600
                },
                height: 300,
                width: 300,
                material: this.third_land

            },
            {
                position: {
                    x: 900,
                    y: 600
                },
                height: 300,
                width: 300,
                material: this.third_land

            },
            {
                position: {
                    x: 1200,
                    y: 600
                },
                height: 300,
                width: 300,
                material: this.third_land

            },
            {
                position: {
                    x: 1500,
                    y: 600
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 1800,
                    y: 600
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 0,
                    y: 900
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 300,
                    y: 900
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 600,
                    y: 900
                },
                height: 300,
                width: 300,
                material: this.third_land

            },
            {
                position: {
                    x: 900,
                    y: 900
                },
                height: 300,
                width: 300,
                material: this.third_land

            },
            {
                position: {
                    x: 1200,
                    y: 900
                },
                height: 300,
                width: 300,
                material: this.third_land

            },
            {
                position: {
                    x: 1500,
                    y: 900
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 1800,
                    y: 900
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 0,
                    y: 1200
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 300,
                    y: 1200
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 600,
                    y: 1200
                },
                height: 300,
                width: 300,
                material: this.third_land

            },
            {
                position: {
                    x: 900,
                    y: 1200
                },
                height: 300,
                width: 300,
                material: this.third_land

            },
            {
                position: {
                    x: 1200,
                    y: 1200
                },
                height: 300,
                width: 300,
                material: this.third_land

            },
            {
                position: {
                    x: 1500,
                    y: 1200
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 1800,
                    y: 1200
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 0,
                    y: 1500
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 300,
                    y: 1500
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 600,
                    y: 1500
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 900,
                    y: 1500
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 1200,
                    y: 1500
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 1500,
                    y: 1500
                },
                height: 300,
                width: 300,
                material: this.second_land

            },
            {
                position: {
                    x: 1800,
                    y: 1500
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 0,
                    y: 1800
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 300,
                    y: 1800
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 600,
                    y: 1800
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 900,
                    y: 1800
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 1200,
                    y: 1800
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 1500,
                    y: 1800
                },
                height: 300,
                width: 300,
                material: this.first_land

            },
            {
                position: {
                    x: 1800,
                    y: 1800
                },
                height: 300,
                width: 300,
                material: this.first_land

            }
        ]
    }
    get() {
        return this.tile_table
    }
}