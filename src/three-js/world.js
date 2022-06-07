import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { loadEngineer } from './components/engineer.js';

import { CustomOutlinePass } from './shaders/customOutlinePass.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/resizer.js';
import { Loop } from './systems/loop.js';

import { Vector2, Vector3, SphereGeometry,MeshBasicMaterial, Mesh } from "three";
import { DepthTexture } from "three/src/textures/DepthTexture.js";
import { WebGLRenderTarget } from "three/src/renderers/WebGLRenderTarget.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

let camera;
let controls;
let renderer;
let scene;
let loop;
let engineer;

class World {
  constructor(container) {    
    camera = createCamera(container)
    renderer = createRenderer()
    scene = createScene()
    controls = createControls(camera, renderer.domElement)
    let resizer = new Resizer(container, camera, renderer)
    const { ambientLight, mainLight } = createLights()

    const depthTexture = new DepthTexture();
    const renderTarget = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        depthTexture: depthTexture,
        depthBuffer: true,
      }
    );
    this.composer = new EffectComposer(renderer, renderTarget);
    const pass = new RenderPass(scene, camera);
    this.composer.addPass(pass);
    const customOutline = new CustomOutlinePass(
      new Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );
    customOutline.fsQuad.material.uniforms.outlineColor.value.set(0x000000);
    customOutline.fsQuad.material.uniforms.multiplierParameters.value.w = 0;
    customOutline.fsQuad.material.uniforms.width.value = 3;
    //this.composer.addPass(customOutline);
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms["resolution"].value.set(
      1 / window.innerWidth,
      1 / window.innerHeight
    );
    //this.composer.addPass(effectFXAA);
    
    loop = new Loop(camera, scene, this.composer)
    loop.updatables.push(controls)
    scene.add(ambientLight, mainLight)
    container.append(renderer.domElement)
    window.addEventListener('mousemove', this.onMouseMove, false)
  }

  async init() {
    engineer = await loadEngineer()
    controls.target.set(engineer.gameObject.position.x, engineer.gameObject.position.y + 5, engineer.gameObject.position.z)
    engineer.gameObject.rotation.set(0,3,0)
    scene.add(engineer.gameObject)
    loop.updatables.push(engineer)
    console.log(scene)
    const geometry = new SphereGeometry( 20, 32, 16 );
    const material = new MeshBasicMaterial( { color: 0xffffff, opacity: 0.05, transparent: true } );
    const sphere = new Mesh( geometry, material );
    //scene.add( sphere );
    engineer.engineerIK.scene = scene
  }

  onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    let canvasSize = new Vector2()
    renderer.getSize(canvasSize)
    const mouseX = ( x / canvasSize.x ) *  2 - 1
    const mouseY = ( y / canvasSize.y ) * - 2 + 1
    if (engineer) {
      engineer.engineerIK.onMouseMove(new Vector2(mouseX, mouseY), camera)
    }
  }

  render() {
    renderer.render(scene, camera)
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}

export default World
