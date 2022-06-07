import { MeshToonMaterial, TextureLoader, NearestFilter } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EngineerIK } from './engineer-ik.js'

class Engineer {
  constructor(engineerRoot) {
    this.gameObject = engineerRoot
    this.engineerMesh = engineerRoot.children[6]

    const gradientMap = new TextureLoader().load( '/assets/models/lightingRamp.png' );
    gradientMap.minFilter = NearestFilter
    let newMat = new MeshToonMaterial({
      map: this.engineerMesh.material.map,
      //gradientMap: gradientMap
    })
    newMat.skinning = true
    newMat.morphTargets = true
    this.engineerMesh.material = newMat

    this.engineerIK = new EngineerIK(this.engineerMesh, false)
  }

  tick(clock) {
    this.engineerIK.tick(clock)
    //mixer.update(clock.getDelta())
    
    //engineer.children[6].skeleton.bones[6].rotation.set(rot1)
    //engineer.children[6].skeleton.bones[12].rotation.set(rot2)
  }
}

async function loadEngineer() {
  let promise = new Promise((resolve, reject) =>
  {
    const loader = new GLTFLoader()
    loader.load('/assets/models/Engineer.glb',
      (gltf) => {
        const engineer = gltf.scene.children[0]
        resolve(new Engineer(engineer))
      },
      (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
          console.log(error)
      }
    )
  })
  return await promise
}

export { loadEngineer };
