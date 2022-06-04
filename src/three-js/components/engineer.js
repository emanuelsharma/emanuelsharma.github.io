import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EngineerIK } from 'engineer-ik.js';

class Engineer {
  constructor(engineerRoot) {
    let engineerMesh = engineerRoot.children[6]

    let newMat = new MeshToonMaterial({
      map: engineerMesh.material.map
    })
    newMat.skinning = true
    newMat.morphTargets = true
    engineerMesh.material = newMat

    this.engineerIK = new EngineerIK(engineerMesh)
  }

  update() {
    this.engineerIK.Update()
  }
}

async function loadEngineer() {
  const loader = new GLTFLoader()
  loader.load('/assets/Engineer.glb',
    (gltf) => {
      engineer = gltf.scene.children[0]
      return new Engineer(engineer)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
  )
}

export { loadEngineer };
