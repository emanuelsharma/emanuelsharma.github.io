import { Plane, Line, LineBasicMaterial, Sphere, BufferAttribute, BufferGeometry, SphereGeometry, MeshBasicMaterial, Mesh, Quaternion, Raycaster, Vector3 } from "three"
import { CCDIKHelper, CCDIKSolver } from "three/examples/jsm/animation/CCDIKSolver.js";

export class EngineerIK {
  constructor(engineerMesh, includeArms) {
    this.body = engineerMesh.skeleton.bones[0]
    this.mesh = engineerMesh
    this.bodyOrigin = new Vector3()
    this.bodyOrigin.copy(this.body.position)
    this.neckIk = 
    {
      target: 16,
      effector: 3,
      links: [ { index: 2 }, { index: 1 } ]
    }
    this.rightLegIk = 
    {
      target: 17,
      effector: 6,
      links: [ { index: 5 }, { index: 4 } ]
    }
    this.leftLegIk =
    {
      target: 19,
      effector: 12,
      links: [ { index: 11 }, { index: 10 } ]
    }
    this.rightArmIk = 
    {
      target: 18,
      effector: 9,
      links: [ { index: 8 }, { index: 7 } ]
    }
    this.leftArmIk = 
    {
      target: 20,
      effector: 15,
      links: [ { index: 14 }, { index: 13 } ]
    }
    this.ikConfig = []
    this.ikConfig.push(this.neckIk)
    this.ikConfig.push(this.rightLegIk)
    this.ikConfig.push(this.leftLegIk)
    if (includeArms) {
      this.ikConfig.push(this.rightArmIk)
      this.ikConfig.push(this.leftArmIk)
    }
    this.ikSolver = new CCDIKSolver( engineerMesh, this.ikConfig )
    this.ikHelper = new CCDIKHelper( engineerMesh, this.ikConfig )
    const geometry = new SphereGeometry( 0.1, 32, 16 )
    const material = new MeshBasicMaterial( { color: 0xffffff } )
    const sphere = new Mesh( geometry, material )
    this.mesh.skeleton.bones[this.neckIk.target].add( sphere )
    this.offset = new Vector3()
    this.worldPos = new Vector3(0,5,-20)
    this.targetWorldPos = new Vector3(0,5,-20)

    this.resetTargets()
  }

  tick(clock) {
    this.worldPos.lerp(this.targetWorldPos, 0.035)
    if (this.worldPos != null) {
      //if (this.worldPos.distanceTo(this.targetWorldPos) > 0.05) {
        let target = this.mesh.skeleton.bones[this.neckIk.target]
        let parent = target.parent
        this.scene.attach(target)
        target.position.set(0.2*this.worldPos.x,target.position.y,target.position.z)
        parent.attach(target)
        this.body.lookAt(this.worldPos)
        let opposite = new Vector3(-this.worldPos.x, this.worldPos.y, this.worldPos.z)
        this.mesh.skeleton.bones[this.neckIk.effector].lookAt(opposite)
        console.log(this.worldPos)
        this.rotate(this.rightArmIk, -0.015*this.worldPos.x, -0.2+Math.min(0,-0.025*this.worldPos.x))
        this.rotate(this.leftArmIk, 0.015*this.worldPos.x, 0.2+Math.max(0,-0.025*this.worldPos.x))
      //}
    }

    this.ikSolver.update()
    this.body.position.x = this.offset.x + this.bodyOrigin.x + Math.sin(clock.elapsedTime*4) * 0.05
    this.body.position.y = this.offset.y + this.bodyOrigin.y + Math.abs(Math.cos(clock.elapsedTime*4)) * 0.01
  }
  drawRaycastLine(raycaster) {
    let material = new LineBasicMaterial({
      color: 0xff0000,
      linewidth: 10
    });
    let geometry = new BufferGeometry();
    let startVec = new Vector3(
      raycaster.ray.origin.x,
      raycaster.ray.origin.y,
      raycaster.ray.origin.z);

    let endVec = new Vector3(
      raycaster.ray.direction.x,
      raycaster.ray.direction.y,
      raycaster.ray.direction.z);
    
    // could be any number
    endVec.multiplyScalar(5000);
    
    // get the point in the middle
    let midVec = new Vector3();
    midVec.lerpVectors(startVec, endVec, 0.5);
    const vertices = new Float32Array( [
      startVec.x,startVec.y,startVec.z,
      midVec.x,midVec.y,midVec.z,
      endVec.x,endVec.y,endVec.z
    ] );
    geometry.setAttribute( 'position', new BufferAttribute( vertices, 3 ) );

    console.log('vec start', startVec);
    console.log('vec mid', midVec);
    console.log('vec end', endVec);

    let line = new Line(geometry, material);
    this.scene.add(line);
  }

  onMouseMove(mv, camera) {
    let sphere = new Sphere(new Vector3(0,0,0), 20)
    var raycaster = new Raycaster()
    raycaster.setFromCamera( mv, camera )
    if (raycaster.ray) {
      this.targetWorldPos = raycaster.ray.intersectSphere(sphere, this.targetWorldPos)
    }
  }

  resetIkChain(e) {
    console.log("here")
    let pos = new Vector3()
    this.mesh.skeleton.bones[e.effector].getWorldPosition(pos)
    pos = this.mesh.skeleton.bones[e.target].parent.worldToLocal(pos)
    this.mesh.skeleton.bones[e.target].position.set(pos.x,pos.y,pos.z)
    for (const link of e.links) {
      link.defaultRot = this.mesh.skeleton.bones[link.index].rotation.clone()
      link.defaultRot.z = 0
    }
  }
  resetTargets() {
    for (const e of this.ikConfig) {
      this.resetIkChain(e)
    }
    this.resetIkChain(this.rightArmIk)
    this.resetIkChain(this.leftArmIk)
  }

  rotate(ikChain, rotationX, rotationZ) {
    this.mesh.skeleton.bones[ikChain.links[1].index].rotation.z = ikChain.links[1].defaultRot.z - rotationZ;
    for (const e of ikChain.links) {
      this.mesh.skeleton.bones[e.index].rotation.x = e.defaultRot.x + rotationX;
    }
  }
}