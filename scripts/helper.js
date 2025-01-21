import * as THREE from '../threejs/build/three.module.js';
import { FlakesTexture } from '../threejs/examples/jsm/textures/FlakesTexture.js';

export let frameTexture = new THREE.CanvasTexture(new FlakesTexture());
frameTexture.wrapS = THREE.RepeatWrapping;
frameTexture.wrapT = THREE.RepeatWrapping;
frameTexture.repeat.x = 10;
frameTexture.repeat.y = 6;

export const objectsHelper = (objects) => {
  objects.forEach(object => {
    object.castShadow = true;
    object.receiveShadow = true;
  })
};