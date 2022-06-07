import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
	controls.dampingFactor = 0.05
  controls.screenSpacePanning = false
  controls.minDistance = 5
  controls.maxDistance = 40
  //controls.autoRotate = true

  controls.enableDamping = true

  // forward controls.update to our custom .tick method
  controls.tick = () => controls.update()

  return controls
}

export { createControls }
