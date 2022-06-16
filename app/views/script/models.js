class Models {
    constructor() {
        //materiały
        this.first_land = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide,
            wireframe: false,
            map: new THREE.TextureLoader().load("textures/hill.jpg"),
            name: "hills"
        })
        this.second_land = new THREE.MeshStandardMaterial({
            color: 0x995544,
            side: THREE.DoubleSide,
            wireframe: false,
            map: new THREE.TextureLoader().load("textures/desert.jpg"),
            name: "desert"
        })
        this.third_land = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
            wireframe: false,
            map: new THREE.TextureLoader().load("textures/hell.jpg"),
            name: "hell"
        })
        this.player_temp = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            wireframe: false,
            map: new THREE.TextureLoader().load("textures/player.jpg")
        })
        this.tile_table = [
            {
                position: {
                    x: -2000,
                    y: 0,
                    z: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "corner",
                name: "village",
                actions: [
                    "mistic"
                ]

            },
            {
                position: {
                    x: -1430,
                    y: 0,
                    z: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "up",
                name: "fields",
                actions: ["take"]

            },
            {
                position: {
                    x: -860,
                    y: 0,
                    z: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "up",
                name: "graveyard",
                actions: []


            },
            {
                position: {
                    x: -290,
                    y: 0,
                    z: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "up",
                name: "woods",
                actions: ["take"]

            },
            {
                position: {
                    x: 280,
                    y: 0,
                    z: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "up",
                name: "sentinel",
                actions: [
                    {
                        name: "travel",
                        destination: "1,4"
                    }
                ]

            },
            {
                position: {
                    x: 850,
                    y: 0,
                    z: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "up",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 1420,
                    y: 0,
                    z: -1500
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "up",
                name: "hills",
                actions: ["take"]


            },
            {
                position: {
                    x: -2050,
                    y: 0,
                    z: -1130
                },
                height: 370,
                width: 470,
                material: this.first_land,
                orientation: "left",
                name: "hills",
                actions: ["take"]


            },
            {
                position: {
                    x: -1510,
                    y: 50,
                    z: -1130
                },
                height: 370,
                width: 610,
                material: this.second_land,
                orientation: "corner",
                name: "hills",
                actions: [
                    {
                        name: "travel",
                        destination: "2,2"
                    }
                ]


            },
            {
                position: {
                    x: -900,
                    y: 50,
                    z: -1130
                },
                height: 370,
                width: 610,
                material: this.second_land,
                orientation: "up",
                name: "hills",
                actions: ["take"]


            },
            {
                position: {
                    x: -290,
                    y: 50,
                    z: -1130
                },
                height: 370,
                width: 610,
                material: this.second_land,
                orientation: "up",
                name: "hills",
                actions: ["take"]


            },
            {
                position: {
                    x: 320,
                    y: 50,
                    z: -1130
                },
                height: 370,
                width: 610,
                material: this.second_land,
                orientation: "up",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 930,
                    y: 50,
                    z: -1130
                },
                height: 370,
                width: 610,
                material: this.second_land,
                orientation: "corner",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 1470,
                    y: 0,
                    z: -1130
                },
                height: 370,
                width: 470,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -2050,
                    y: 0,
                    z: -760
                },
                height: 370,
                width: 470,
                material: this.first_land,
                orientation: "left",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -1605,
                    y: 50,
                    z: -760
                },
                height: 370,
                width: 420,
                material: this.second_land,
                orientation: "left",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -1025,
                    y: 100,
                    z: -760
                },
                height: 370,
                width: 736,
                material: this.third_land,
                orientation: "corner",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -290,
                    y: 100,
                    z: -760
                },
                height: 370,
                width: 738,
                material: this.third_land,
                orientation: "up",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 445,
                    y: 100,
                    z: -760
                },
                height: 370,
                width: 736,
                material: this.third_land,
                orientation: "corner",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 1025,
                    y: 50,
                    z: -760
                },
                height: 370,
                width: 420,
                material: this.second_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 1470,
                    y: 0,
                    z: -760
                },
                height: 370,
                width: 470,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -2050,
                    y: 0,
                    z: -390
                },
                height: 370,
                width: 470,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -1605,
                    y: 50,
                    z: -390
                },
                height: 370,
                width: 420,
                material: this.second_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -1125,
                    y: 100,
                    z: -390
                },
                height: 370,
                width: 536,
                material: this.third_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -290,
                    y: 150,
                    z: -390
                },
                height: 370,
                width: 1138,
                material: this.third_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 545,
                    y: 100,
                    z: -390
                },
                height: 370,
                width: 536,
                material: this.third_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 1025,
                    y: 50,
                    z: -390
                },
                height: 370,
                width: 420,
                material: this.second_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 1470,
                    y: 0,
                    z: -390
                },
                height: 370,
                width: 470,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -2050,
                    y: 0,
                    z: -20
                },
                height: 370,
                width: 470,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -1605,
                    y: 50,
                    z: -20
                },
                height: 370,
                width: 420,
                material: this.second_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -1025,
                    y: 100,
                    z: -20
                },
                height: 370,
                width: 736,
                material: this.third_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -290,
                    y: 100,
                    z: -20
                },
                height: 370,
                width: 738,
                material: this.third_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 445,
                    y: 100,
                    z: -20
                },
                height: 370,
                width: 736,
                material: this.third_land,
                orientation: "right",
                name: "hills",
                actions: [
                    {
                        name: "travel",
                        destination: "3,3"
                    },
                    {
                        name: "win"
                    }
                ]

            },
            {
                position: {
                    x: 1025,
                    y: 50,
                    z: -20
                },
                height: 370,
                width: 420,
                material: this.second_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 1470,
                    y: 0,
                    z: -20
                },
                height: 370,
                width: 470,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -2050,
                    y: 0,
                    z: 350
                },
                height: 370,
                width: 470,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -1510,
                    y: 50,
                    z: 350
                },
                height: 370,
                width: 610,
                material: this.second_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -900,
                    y: 50,
                    z: 350
                },
                height: 370,
                width: 610,
                material: this.second_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -290,
                    y: 50,
                    z: 350
                },
                height: 370,
                width: 610,
                material: this.second_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 320,
                    y: 50,
                    z: 350
                },
                height: 370,
                width: 610,
                material: this.second_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 930,
                    y: 50,
                    z: 350
                },
                height: 370,
                width: 610,
                material: this.second_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 1470,
                    y: 0,
                    z: 350
                },
                height: 370,
                width: 470,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -2000,
                    y: 0,
                    z: 720
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -1430,
                    y: 0,
                    z: 720
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -860,
                    y: 0,
                    z: 720
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: -290,
                    y: 0,
                    z: 720
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 280,
                    y: 0,
                    z: 720
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 850,
                    y: 0,
                    z: 720
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            },
            {
                position: {
                    x: 1420,
                    y: 0,
                    z: 720
                },
                height: 370,
                width: 570,
                material: this.first_land,
                orientation: "right",
                name: "hills",
                actions: ["take"]

            }
        ]
    }
    get() {
        return this.tile_table
    }
}