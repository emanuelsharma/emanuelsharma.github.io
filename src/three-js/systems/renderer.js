import { WebGLRenderer } from 'three'

function createRenderer() {
  const renderer = new WebGLRenderer( { 
    antialias: true, 
    alpha: true, 
    logarithmicDepthBuffer: true,
    physicallyCorrectLights: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);

  return renderer
}

export { createRenderer }
