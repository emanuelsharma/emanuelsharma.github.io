import {
  BoxBufferGeometry,
  Color,
  Vector2,
  Mesh,
  DirectionalLight,
  AmbientLight,
  DepthTexture,
  WebGLRenderTarget,
  MeshStandardMaterial,
  MeshToonMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { EffectComposer } from "https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "https://unpkg.com/three@0.126.1/examples/jsm/shaders/FXAAShader.js";
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';
import { CustomOutlinePass } from "/customOutlinePass.js";

const loader = new GLTFLoader();
const [engineerData] = await Promise.all([
  loader.loadAsync('/assets/Engineer.glb')
]);
let engineer = engineerData.scene.children[0];
engineerData.scene.children[0].traverse((node) => {
  let newMat = new MeshToonMaterial({map: node.material.map});
  node.material = newMat
});

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create a Scene
const scene = new Scene();

engineer.position.set(0, -2, -10);
scene.add(engineer);

// Set the background color
scene.background = null;

// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);

// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set(0, 0, 10);

// create a geometry
const geometry = new BoxBufferGeometry(2, 2, 2);

// create a default (white) Basic material
const material = new MeshStandardMaterial();

// create a Mesh containing the geometry and material
const cube = new Mesh(geometry, material);

// add the mesh to the scene
//scene.add(cube);

const light = new DirectionalLight('white', 2);
light.position.set(10, 10, 10);
scene.add(light);
const light2 = new AmbientLight('white', 0.5);
scene.add(light2);

const depthTexture = new DepthTexture();
const renderTarget = new WebGLRenderTarget(
  window.innerWidth,
  window.innerHeight,
  {
    depthTexture: depthTexture,
    depthBuffer: true,
  }
);

// create the renderer
const renderer = new WebGLRenderer( { antialias: true, alpha: true, logarithmicDepthBuffer: true } );
renderer.physicallyCorrectLights = true;

const composer = new EffectComposer(renderer, renderTarget);
const pass = new RenderPass(scene, camera);
composer.addPass(pass);
const customOutline = new CustomOutlinePass(
  new Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera
);
customOutline.fsQuad.material.uniforms.outlineColor.value.set(0x000000);
customOutline.fsQuad.material.uniforms.multiplierParameters.value.w = 0;
customOutline.fsQuad.material.uniforms.width.value = 3;
composer.addPass(customOutline);
const effectFXAA = new ShaderPass(FXAAShader);
effectFXAA.uniforms["resolution"].value.set(
  1 / window.innerWidth,
  1 / window.innerHeight
);
composer.addPass(effectFXAA);

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

renderer.setClearColor(0x000000, 0);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

function animate() {
  requestAnimationFrame( animate );

  engineer.rotation.z += 0.01;

  composer.render( scene, camera );
};

animate();