  // model
  // const loader = new FBXLoader();
  // loader.load( '../threejs/examples/models/fbx/Samba Dancing.fbx', function ( object ) {

  //   mixer = new THREE.AnimationMixer( object );

  //   const action = mixer.clipAction( object.animations[ 0 ] );
  //   // action.play();

  //   object.traverse( function ( child ) {

  //     if ( child.isMesh ) {

  //       child.castShadow = true;
  //       child.receiveShadow = true;

  //     }

  //   } );

  //   scene.add( object );

  // } );





  
// import { GLTFLoader } from '../threejs/examples/jsm/loaders/GLTFLoader.js';
// import * as THREE from '../threejs/build/three.module.js';

// import Stats from '../threejs/examples/jsm/libs/stats.module.js';

// import { dirLight, ambientlight, hemiLight } from "/scripts/lights.js"

// import { OrbitControls } from '/threejs/examples/jsm/controls/OrbitControls.js';
// import { FBXLoader } from '../threejs/examples/jsm/loaders/FBXLoader.js';
// import { FlakesTexture } from '../threejs/examples/jsm/textures/FlakesTexture.js';
// import { FontLoader } from '../threejs/examples/jsm/loaders/FontLoader.js';
// import { TextGeometry } from '../threejs/examples/jsm/geometries/TextGeometry.js';

// let camera, scene, renderer, stats;

// const clock = new THREE.Clock();

// let mixer, group;

// let targetRotation = 0;
// let targetRotationOnPointerDown = 0;

// let pointerX = 0;
// let pointerXOnPointerDown = 0;
// let windowHalfX = window.innerWidth / 2;

// init();
// animate();


// function init() {

//   const container = document.createElement('div');
//   document.body.appendChild(container);

//   camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000);
//   camera.position.set(100, 60, 300);

//   scene = new THREE.Scene();
//   scene.background = new THREE.Color("#292A2C");
//   group = new THREE.Group()
//   scene.add(group);
//   scene.add(ambientlight)
//   scene.add(hemiLight)
//   scene.add(dirLight);

//   // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

//   // ground
//   let planeMaterial = new THREE.MeshBasicMaterial({ color: "#000", depthWrite: true, side: THREE.DoubleSide })
//   planeMaterial.transparent = true;
//   planeMaterial.opacity = 0.13;
//   const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), planeMaterial);
//   planeMesh.rotation.x = - Math.PI / 2;
//   planeMesh.receiveShadow = true;
//   scene.add(mesh);

//   //helper
//   function objectsHelper(objects) {
//     objects.forEach(object => {
//       object.castShadow = true;
//       object.receiveShadow = true;
//       // group.add(object);
//     })
//   }

//   const fontloader = new FontLoader();

//   fontloader.load('../assets/fonts/Gilroy-Bold.json', function (font) {
//     const textgeometry = new TextGeometry('cruz', {
//       font: font,
//       size: 90,
//       height: 5,
//       curveSegments: 12,
//       // bevelEnabled: true,
//       bevelThickness: 1,
//       bevelSize: 8,
//       bevelOffset: 0,
//       bevelSegments: 5
//     });
//     let material = new THREE.MeshBasicMaterial({ color: "#2F3032" })
//     material.transparent = true
//     material.opacity = 0.06
//     let textMesh = new THREE.Mesh(textgeometry, material);
//     textMesh.position.set(-20, 100, -200);
//     scene.add(textMesh);
//   });

//   const loader = new THREE.CubeTextureLoader();
//   loader.setPath('/threejs/examples/textures/cube/Bridge2/');

//   let textureCube = loader.load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);
//   textureCube.encoding = THREE.sRGBEncoding;
//   const textureLoader = new THREE.TextureLoader();

//   let textureEquirec = textureLoader.load('/threejs/examples/textures/2294472375_24a3b8ef46_o.jpg');
//   textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
//   textureEquirec.encoding = THREE.sRGBEncoding;

//   let texture = new THREE.CanvasTexture(new FlakesTexture());
//   texture.wrapS = THREE.RepeatWrapping;
//   texture.wrapT = THREE.RepeatWrapping;
//   //repeat the wrapping 10 (x) and 6 (y) times
//   texture.repeat.x = 10;
//   texture.repeat.y = 6;

//   //cycle modal loader
//   var gltfloader = new GLTFLoader();
//   gltfloader.load(
//     '/assets/models/cycle8.gltf',
//     function (gltf) {
//       window.objects = gltf.scene;
//       gltf.scene.scale.set(0.1, 0.1, 0.1);
//       gltf.scene.position.set(0, 53, 0);
//       gltf.scene.autorotation = true;
//       gltf.scene.castShadow = true;
//       objectsHelper(gltf.scene.children)
//       //frame properties
//       gltf.scene.children[0].material.roughness = 0.3;
//       gltf.scene.children[0].material.metalness = 1.0;
//       gltf.scene.children[0].material.reflectivity = 1.0;
//       gltf.scene.children[0].material.color = new THREE.Color(0xff0000)
//       gltf.scene.children[0].material.clearcoat = 1.0
//       gltf.scene.children[0].material.clearcoatRoughness = 1.0
//       gltf.scene.children[0].material.envMap = texture
//       group.add(gltf.scene);
//       group.position.set(100, 0, 0)
//       scene.add(group);

//     },
//     // called while loading is progressing
//     function (xhr) {

//       console.log((xhr.loaded / xhr.total * 100) + '% loaded');

//     },
//     // called when loading has errors
//     function (error) {

//       console.log('An error happened', error);

//     }
//   );

//   // let cubeGeom = new THREE.BoxGeometry();
//   // let cubeMat = new THREE.MeshPhongMaterial({ color: "#fff"})
//   // let cubeMesh = new THREE.Mesh(cubeGeom,cubeMat);
//   // cubeMesh.scale.set(100,100,100)
//   // group.position.set(100,50,0)
//   // group.add(cubeMesh);

//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.shadowMap.enabled = true;

//   renderer.outputEncoding = THREE.sRGBEncoding
//   renderer.toneMapping = THREE.ACESFilmicToneMapping;
//   renderer.toneMappingExposure = 1.25;

//   container.appendChild(renderer.domElement);
//   container.addEventListener('pointerdown', onPointerDown);
//   window.addEventListener('resize', onWindowResize);
//   // const controls = new OrbitControls(camera, renderer.domElement);
//   // controls.update()

// }

// console.log(group)

// function onPointerDown(event) {

//   if (event.isPrimary === false) return;

//   pointerXOnPointerDown = event.clientX - windowHalfX;
//   targetRotationOnPointerDown = targetRotation;

//   document.addEventListener('pointermove', onPointerMove);
//   document.addEventListener('pointerup', onPointerUp);

// }

// function onPointerMove(event) {

//   if (event.isPrimary === false) return;

//   pointerX = event.clientX - windowHalfX;

//   targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;

// }

// function onPointerUp() {

//   if (event.isPrimary === false) return;

//   document.removeEventListener('pointermove', onPointerMove);
//   document.removeEventListener('pointerup', onPointerUp);

// }

// function onWindowResize() {

//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);

// }

// //

// function animate() {

//   group.rotation.y += (targetRotation - group.rotation.y) * 0.02;

//   requestAnimationFrame(animate);

//   const delta = clock.getDelta();

//   if (mixer) mixer.update(delta);

//   renderer.render(scene, camera);
// }




// let frameMaterialProps={
//   roughness :0.3,
//    metalness : 1.0,
//    reflectivity : 1.0,
//    color : new THREE.Color(0xff0000),
//    clearcoat : 1.0,
//    clearcoatRoughness : 1.0,
//    envMap : frameTexture,
//  };