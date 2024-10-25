import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// axes helper
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// grid helper
const gridHelper = new THREE.GridHelper( 10, 10 );
scene.add( gridHelper );


// add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//sphere
const geometry2 = new THREE.SphereGeometry( 1, 32, 32 );
const material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const sphere = new THREE.Mesh( geometry2, material2 );
scene.add( sphere );

// sphere location
sphere.position.x = 2;

// torus, blue color
const geometry3 = new THREE.TorusGeometry( 1, 0.3, 16, 100 );
const material3 = new THREE.MeshNormalMaterial( { color: 0x0000ff } );
const torus = new THREE.Mesh( geometry3, material3 );
scene.add( torus );

// torus location
torus.position.x = -2;

camera.position.z = 5;

const clock = new THREE.Clock();

function animate() {
  const elaspedTime = clock.getElapsedTime();
  console.log( elaspedTime);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );

  // animate torus, spin
  torus.rotation.x = elaspedTime;

  // move up camera
  camera.position.y = Math.sin(elaspedTime) * 2;
  camera.position.x = Math.cos(elaspedTime) * 2;

// camera look at
  camera.lookAt(cube.position);

  controls.update();  

}