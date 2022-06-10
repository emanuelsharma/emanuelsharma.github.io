import { TextureLoader, MeshBasicMaterial, PlaneGeometry, Mesh } from 'three'

function createBlobShadow(gameObject) {
  const map = new TextureLoader().load( '/assets/graphics/BlobShadowWithFeet.png' )
  const material = new MeshBasicMaterial( { 
    alphaMap: map, 
    color: 0x000000, 
    transparent: true,
    side: 2,
    opacity: 0.2
  } )

  const geometry = new PlaneGeometry( 10, 10 )
  const plane = new Mesh( geometry, material )
  gameObject.add( plane )
  plane.rotation.x = 0.5*Math.PI
  plane.rotation.z = Math.PI
  plane.position.z = 1
  return plane
}

export { createBlobShadow }
