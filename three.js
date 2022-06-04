import {
  BoxBufferGeometry,
  Color,
  Clock,
  Vector2,
  Vector3,
  Mesh,
  DirectionalLight,
  AmbientLight,
  DepthTexture,
  WebGLRenderTarget,
  MeshStandardMaterial,
  SkeletonHelper,
  Skeleton,
  MeshToonMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AnimationMixer,
  SphereGeometry,
  MeshBasicMaterial,
} from 'https://unpkg.com/three@0.141.0/build/three.module.js';
import { CCDIKHelper, CCDIKSolver } from "https://unpkg.com/three@0.141.0/examples/jsm/animation/CCDIKSolver.js";
import { EffectComposer } from "https://unpkg.com/three@0.141.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.141.0/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "https://unpkg.com/three@0.141.0/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "https://unpkg.com/three@0.141.0/examples/jsm/shaders/FXAAShader.js";
import { GLTFLoader } from 'https://unpkg.com/three@0.141.0/examples/jsm/loaders/GLTFLoader.js';
import { DragControls } from 'https://unpkg.com/three@0.141.0/examples/jsm/controls/DragControls';
import { TransformControls } from 'https://unpkg.com/three@0.141.0/examples/jsm/controls/TransformControls';
import { CustomOutlinePass } from "/customOutlinePass.js";

let activeAction
const setAction = (toAction) => {
  console.log(toAction)
  if (toAction != activeAction) {
    if (activeAction != null){
      activeAction.stop()
      activeAction.fadeOut(1)}
      activeAction = toAction
      activeAction.reset()
      activeAction.fadeIn(1)
      activeAction.play()
  }
}

let mixer = null;
const animationActions = []
let modelReady = false;

// create a Scene
const scene = new Scene();

const loader = new GLTFLoader();
let engineer;
let ikSolver;
let target;
let body;
let bodyOrigin;
let rot1, rot2
loader.load('/assets/Engineer.glb',
  (gltf) => {
    mixer = new AnimationMixer(gltf.scene)

    //console.log(gltf)
    const animationAction = mixer.clipAction(gltf.animations[0])
    console.log(gltf.animations)
    animationActions.push(animationAction)

    console.log(gltf);
    engineer = gltf.scene.children[0];
    let newMat = new MeshToonMaterial({map: engineer.children[6].material.map});
    newMat.skinning = true;
    newMat.morphTargets = true;
    engineer.children[6].material = newMat
    engineer.scale.set(1.5,1.5,1.5);
    engineer.rotation.set(0, 3, 0);
    engineer.position.set(0, 2, -5);
    scene.add(engineer);
    console.log(engineer)

    console.log(engineer.children[6].skeleton.bones);
    target = engineer.children[6].skeleton.bones[16]
    body = engineer.children[6].skeleton.bones[0]
    bodyOrigin = body.position
    const iks = [
      {
        target: 16,
        effector: 3,
        links: [ { index: 2 }, { index: 1 } ]
      },
      {
        target: 17,
        effector: 6,
        links: [ { index: 5 }, { index: 4 } ]
      },/*
      {
        target: 18,
        effector: 9,
        links: [ { index: 8 }, { index: 7 } ]
      },*/
      {
        target: 19,
        effector: 12,
        links: [ { index: 11 }, { index: 10 } ]
      },/*
      {
        target: 20,
        effector: 15,
        links: [ { index: 14 }, { index: 13 } ]
      }*/
    ];
    let pos = new Vector3
    engineer.children[6].skeleton.bones[6].getWorldPosition(pos)
    pos = engineer.children[6].skeleton.bones[17].parent.worldToLocal(pos)
    engineer.children[6].skeleton.bones[17].position.set(pos.x,pos.y,pos.z)

    engineer.children[6].skeleton.bones[9].getWorldPosition(pos)
    pos = engineer.children[6].skeleton.bones[18].parent.worldToLocal(pos)
    engineer.children[6].skeleton.bones[18].position.set(pos.x,pos.y,pos.z)

    engineer.children[6].skeleton.bones[12].getWorldPosition(pos)
    pos = engineer.children[6].skeleton.bones[19].parent.worldToLocal(pos)
    engineer.children[6].skeleton.bones[19].position.set(pos.x,pos.y,pos.z)

    engineer.children[6].skeleton.bones[15].getWorldPosition(pos)
    pos = engineer.children[6].skeleton.bones[20].parent.worldToLocal(pos)
    engineer.children[6].skeleton.bones[20].position.set(pos.x,pos.y,pos.z)

    rot1 = engineer.children[6].skeleton.bones[6].rotation
    rot2 = engineer.children[6].skeleton.bones[12].rotation

    ikSolver = new CCDIKSolver( engineer.children[6], iks );
    console.log(ikSolver)
    //scene.add(new CCDIKHelper(engineer.children[6], iks))

    modelReady = true
    //setAction(animationActions[0]);
  },
  (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
      console.log(error)
  }
)

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

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
camera.position.set(0, 0, 20);

const light = new DirectionalLight('white', 1.5);
light.position.set(10, 10, 10);
scene.add(light);
const light2 = new AmbientLight('white', 1);
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

/*
const geometry = new SphereGeometry(0.5, 5, 5); // (radius, widthSegments, heightSegments)
const material = new MeshBasicMaterial( {color: 0xffff00} );
const sphere = new Mesh(geometry, material);
scene.add(sphere);
sphere.position.set(0,0,0)
const controls = new DragControls( [sphere], camera, renderer.domElement );

// add event listener to highlight dragged objects
controls.addEventListener('dragstart', function (event) {
  event.object.material.color = 0xff0000
})
controls.addEventListener('dragend', function (event) {
  event.object.material.color = 0xffff00
})

window.addEventListener('mousemove', event => {
  sphere.position.x = (event.clientX / window.innerWidth) * 2 - 1;
  sphere.position.y = -(event.clientY / window.innerHeight) * 2 + 1;
})*/
/*
let tc = new TransformControls(camera, renderer.domElement)
tc.attach(sphere)
scene.add(tc);
console.log(tc)*/

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

const clock = new Clock()
function animate() {
  requestAnimationFrame( animate );

  if (modelReady) 
  {
    //engineer.rotation.set(0,clock.elapsedTime * 0.2, 0);
    //target.position.x = Math.sin(clock.elapsedTime * 2) * 5;
    target.position.y = 20;
    target.position.z = 0;
    //body.position.x = bodyOrigin.x + Math.sin(clock.elapsedTime*4) * 0.01;
    //body.position.y = bodyOrigin.y + Math.cos(clock.elapsedTime*4) * 0.005;
    mixer.update(clock.getDelta())
    ikSolver.update();
    
    //engineer.children[6].skeleton.bones[6].rotation.set(rot1)
    //engineer.children[6].skeleton.bones[12].rotation.set(rot2)
  }

  composer.render( scene, camera )
};

animate();