import * as THREE from '../threejs/build/three.module.js';

let planeMaterial = new THREE.MeshBasicMaterial({ 
  color: "#000", 
  depthWrite: true, 
  side: THREE.DoubleSide ,
  transparent : true,
  opacity : 0.13,
})

export const platformBase = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), planeMaterial);
platformBase.rotation.x = - Math.PI / 2;
platformBase.receiveShadow = true;;