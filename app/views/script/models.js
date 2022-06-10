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
                    x: -2050,
                    y: -1130
                },
                height: 370,
                width: 470,
                material: this.first_land

            },
            {
                position: {
                    x: -1510,
                    y: -1130
                },
                height: 370,
                width: 610,
                material: this.second_land

            },
            {
                position: {
                    x: -910,
                    y: -1130
                },
                height: 370,
                width: 610,
                material: this.second_land

            },
            {
                position: {
                    x: -300,
                    y: -1130
                },
                height: 370,
                width: 610,
                material: this.second_land

            },
            {
                position: {
                    x: 310,
                    y: -1130
                },
                height: 370,
                width: 610,
                material: this.second_land

            },
            {
                position: {
                    x: 920,
                    y: -1130
                },
                height: 370,
                width: 610,
                material: this.second_land

            },
            {
                position: {
                    x: 1470,
                    y: -1130
                },
                height: 370,
                width: 470,
                material: this.first_land

            },
            {
                position: {
                    x: -2050,
                    y: -760
                },
                height: 370,
                width: 470,
                material: this.first_land

            },
            {
                position: {
                    x: -1430,
                    y: -760
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: -860,
                    y: -760
                },
                height: 370,
                width: 570,
                material: this.third_land

            },
            {
                position: {
                    x: -290,
                    y: -760
                },
                height: 370,
                width: 570,
                material: this.third_land

            },
            {
                position: {
                    x: 280,
                    y: -760
                },
                height: 370,
                width: 570,
                material: this.third_land

            },
            {
                position: {
                    x: 850,
                    y: -760
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: 1470,
                    y: -760
                },
                height: 370,
                width: 470,
                material: this.first_land

            },
            {
                position: {
                    x: -2050,
                    y: -390
                },
                height: 370,
                width: 470,
                material: this.first_land

            },
            {
                position: {
                    x: -1430,
                    y: -390
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: -860,
                    y: -390
                },
                height: 370,
                width: 570,
                material: this.third_land

            },
            {
                position: {
                    x: -290,
                    y: -390
                },
                height: 370,
                width: 570,
                material: this.third_land

            },
            {
                position: {
                    x: 280,
                    y: -390
                },
                height: 370,
                width: 570,
                material: this.third_land

            },
            {
                position: {
                    x: 850,
                    y: -390
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: 1470,
                    y: -390
                },
                height: 370,
                width: 470,
                material: this.first_land

            },
            {
                position: {
                    x: -2050,
                    y: -20
                },
                height: 370,
                width: 470,
                material: this.first_land

            },
            {
                position: {
                    x: -1430,
                    y: -20
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: -860,
                    y: -20
                },
                height: 370,
                width: 570,
                material: this.third_land

            },
            {
                position: {
                    x: -290,
                    y: -20
                },
                height: 370,
                width: 570,
                material: this.third_land

            },
            {
                position: {
                    x: 280,
                    y: -20
                },
                height: 370,
                width: 570,
                material: this.third_land

            },
            {
                position: {
                    x: 850,
                    y: -20
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: 1470,
                    y: -20
                },
                height: 370,
                width: 470,
                material: this.first_land

            },
            {
                position: {
                    x: -2050,
                    y: 350
                },
                height: 370,
                width: 470,
                material: this.first_land

            },
            {
                position: {
                    x: -1430,
                    y: 350
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: -860,
                    y: 350
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: -290,
                    y: 350
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: 280,
                    y: 350
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: 850,
                    y: 350
                },
                height: 370,
                width: 570,
                material: this.second_land

            },
            {
                position: {
                    x: 1470,
                    y: 350
                },
                height: 370,
                width: 470,
                material: this.first_land

            },
            {
                position: {
                    x: -2000,
                    y: 720
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: -1430,
                    y: 720
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: -860,
                    y: 720
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: -290,
                    y: 720
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: 280,
                    y: 720
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: 850,
                    y: 720
                },
                height: 370,
                width: 570,
                material: this.first_land

            },
            {
                position: {
                    x: 1420,
                    y: 720
                },
                height: 370,
                width: 570,
                material: this.first_land

            }
        ]
    }
    get() {
        return this.tile_table
    }
}