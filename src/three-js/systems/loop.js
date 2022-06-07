import { Clock } from 'three'

const clock = new Clock()

class Loop {
  constructor(camera, scene, composer) {
    this.camera = camera
    this.scene = scene
    this.composer = composer
    this.updatables = []
  }

  start() {
    this.composer.renderer.setAnimationLoop(() => {
      this.tick()
      this.composer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.composer.renderer.setAnimationLoop(null)
  }

  tick() {
    for (const object of this.updatables) {
      object.tick(clock)
      clock.getDelta()
    }
  }
}

export { Loop }
