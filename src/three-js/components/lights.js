import { DirectionalLight, HemisphereLight } from 'three'

function createLights() {
  const ambientLight = new HemisphereLight(
    'white',
    'darkslategrey',
    1,
  )

  const mainLight = new DirectionalLight('white', 0.75)
  mainLight.position.set(10, 10, 10)

  return { ambientLight, mainLight }
}

export { createLights }
