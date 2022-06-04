export class EngineerIK {
  constructor(engineerMesh, includeArms) {
    target = engineerMesh.skeleton.bones[16]
    body = engineerMesh.skeleton.bones[0]
    this.mesh = engineerMesh
    this.bodyOrigin = body.position
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
    this.ikConfig.Add(this.neckIk)
    this.ikConfig.Add(this.rightLegIk)
    this.ikConfig.Add(this.leftLegIk)
    if (includeArms) {
      this.ikConfig.Add(this.rightArmIk)
      this.ikConfig.Add(this.leftArmIk)
    }
    this.ikSolver = new CCDIKSolver( engineerMesh, iks )
    this.ikHelper = new CCDIKHelper(engineer.children[6], iks)
  }

  update() {
    this.ikSolver.update()
  }

  resetTargets() {
    foreach (e in this.ikConfig) {
      let pos = new Vector3()
      this.mesh.skeleton.bones[e.effector].getWorldPosition(pos)
      pos = this.mesh.skeleton.bones[e.target].parent.worldToLocal(pos)
      this.mesh.skeleton.bones[e.target].position.set(pos.x,pos.y,pos.z)
    }
  }
}