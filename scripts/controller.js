import * as THREE from '../threejs/build/three.module.js';
import { OrbitControls } from '../threejs/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../threejs/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from '../threejs/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../threejs/examples/jsm/geometries/TextGeometry.js';

import { dirLight, ambientlight, hemiLight } from "../scripts/lights.js"
import { objectsHelper, frameTexture, } from "../scripts/helper.js"
import { platformBase } from "../scripts/platform.js"

let camera, scene, renderer, stats;

const clock = new THREE.Clock();

let mixer, group;

let targetRotation = 0;
let targetRotationOnPointerDown = 0;

let pointerX = 0;
let pointerXOnPointerDown = 0;
let windowHalfX = window.innerWidth / 2;

let windowOffset = 1

init();
animate();

function init() {

  document.getElementById('container');
  document.body.appendChild(container);

  //init camera
  camera = new THREE.PerspectiveCamera(45, (window.innerWidth * windowOffset) / window.innerHeight, 1, 20000);
  camera.position.set(100, 60, 300);

  //scene base objects
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#292A2C");
  scene.add(platformBase)
  // scene.add(ambientlight)
  scene.add(hemiLight)
  scene.add(dirLight);
  group = new THREE.Group()

  //cycle modal loader
  var gltfloader = new GLTFLoader();
  gltfloader.load('./assets/models/stone.glb',
    function (gltf) {
      window.objects = gltf.scene;
      gltf.scene.scale.set(200,200, 200);
      gltf.scene.position.set(0, 53, 0);
      gltf.scene.autorotation = true;
      // gltf.scene.castShadow = true;
      objectsHelper(gltf.scene.children)
    //   console.log(gltf.scene)
    //   console.log(gltf.scene.children[2].material.color)


      //frame properties
    //   gltf.scene.children[2].material.roughness = 0.3;
    //   gltf.scene.children[2].material.metalness = 1.0;
    //   gltf.scene.children[2].material.reflectivity = 1.0;
    //   gltf.scene.children[30].material.color = new THREE.Color(0xff00cc)
    //   gltf.scene.children[2].material.clearcoat = 1.0
    //   gltf.scene.children[2].material.clearcoatRoughness = 1.0
    //   gltf.scene.children[2].material.envMap = frameTexture

      group.add(gltf.scene);
      console.log(gltf.scene)
      group.position.set(100, 0, 0)
      scene.add(group);
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
      console.log('An error happened', error);
    }
  );

  //cruz text loader
  const fontloader = new FontLoader();
  fontloader.load('/assets/fonts/Montserrat_Bold.json', function (font) {
    const geometry = new TextGeometry('KEELADI', {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelThickness: 1,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5
    });
    let material = new THREE.MeshBasicMaterial({
      color: "#2F3032",
      transparent: true,
      opacity: 0.06,
    })
    material.transparent = true
    material.opacity = 0.06
    let textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.set(-150, 80, -200);
    scene.add(textMesh);
  });

  //renderer properties
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth * windowOffset, window.innerHeight);
  renderer.shadowMap.enabled = true;

  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 2.25;

  container.appendChild(renderer.domElement);
  container.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('resize', onWindowResize);
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.update()

}

//cycle rotation logic
function onPointerDown(event) {
  if (event.isPrimary === false) return;
  pointerXOnPointerDown = event.clientX - windowHalfX;
  targetRotationOnPointerDown = targetRotation;
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;
  pointerX = event.clientX - windowHalfX;
  targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;
}

function onPointerUp() {
  if (event.isPrimary === false) return;
  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
}

//responsive window
function onWindowResize() {
  camera.aspect = (window.innerWidth * windowOffset) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize((window.innerWidth * windowOffset), window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  group.rotation.y += (targetRotation - group.rotation.y) * 0.05;

  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
};