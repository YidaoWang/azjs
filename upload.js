import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Vector2 } from './node_modules/three/src/math/Vector2.js';
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xe0c1ff );

var light = new THREE.HemisphereLight( 0xFFFFFF, 0x696969, 1.3);
//var light = new THREE.PointLight(0xFFFFFF, 2, 50, 1.0);
light.position.set( 0, 20, 0 );
scene.add( light );

const fov    = 60;
const fovRad = (fov / 2) * (Math.PI / 180);// 視野角をラジアンに変換
const dist   = (window.innerHeight / 2) / Math.tan(fovRad);// ウィンドウぴったりのカメラ距離

var camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, dist * 2 );
camera.position.z = dist;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.outputEncoding = THREE.sRGBEncoding;

var loader = new GLTFLoader();
var human1;

loader.load('models/updir/parker_base.gltf', function ( gltf ) {
  human1 = gltf.scene;
  human1.scale.set(350,350,350)
  human1.position.set(0,-350,0);
  scene.add( human1 );
}, undefined, function ( error ) {
  console.error( error );
} );

var mouse = new Vector2(0, 0);
var mousedown = new Vector2(0, 0);
var lastlotation1 = 0;
var isDown = false;

var mouseMoved = function(x, y) {
  mouse.x =  x - (window.innerWidth / 2);
  mouse.y = -y + (window.innerHeight / 2);
}
window.addEventListener('mousemove', e => {
  mouseMoved(e.clientX, e.clientY);
});
window.addEventListener('mousedown', e => {
  isDown = true;
  mousedown.x =  e.clientX - (window.innerWidth / 2);
  mousedown.y = -e.clientY + (window.innerHeight / 2);
  lastlotation1 = human1.rotation.y;
});
window.addEventListener('mouseup', e => {
  isDown = false;
});

var animate = function () {
  requestAnimationFrame( animate );
  if(isDown){
    human1.rotation.y = lastlotation1 + (mouse.x - mousedown.x) / 200;
  }
  else{    
  }
  renderer.render( scene, camera );
};
animate();


