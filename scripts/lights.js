import * as THREE from '../threejs/build/three.module.js';

  //light
  export const dirLight = new THREE.DirectionalLight(0xffffff,0.1);
  dirLight.position.set(0, 200, 100);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 180;
  dirLight.shadow.camera.bottom = - 100;
  dirLight.shadow.camera.left = - 120;
  dirLight.shadow.camera.right = 120;

  // soft white light
  export const ambientlight = new THREE.AmbientLight(0x404040); 

  //hemilight
export const hemiLight = new THREE.HemisphereLight(0x444444, 0x444444);
  hemiLight.position.set(0, 200, 0);;