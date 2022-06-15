class Camera {

    constructor(camera, scene) {

        this.scene = scene
        this.camera = camera

        this.rotation = false
        this.mouseDown = false
        this.mouseY = null
        this.mouseX = null
        this.value = 0

    }

    moveAround(speed) {

        this.camera.position.set(3000 * Math.sin(this.value) - 290, 1500, 6000 * Math.cos(this.value) - 390)
        this.camera.lookAt(-290, 0, -390)

        this.value += 0.005 * speed

    }

    free() {

        let hook = document.getElementById('game')

        hook.onmousedown = () => {
            this.mouseDown = true
        }
        hook.onmouseup = () => {
            this.mouseDown = false
        }
        hook.onmousemove = (e) => {
            if (this.mouseDown == true) {
                if (this.mouseY > this.camera.clientY) {

                }
                this.mouseY = e.clientY
                this.mouseX = e.clientX
                this.camera.lookAt(this.scene.position)
            }
        }

    }

}