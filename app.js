import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Vector2 } from './node_modules/three/src/math/Vector2.js';

const canvas = document.querySelector('#mainCanvas');
const select = document.querySelector('#select')
const width = canvas.width
const height = canvas.height
const fov    = 60;
const fovRad = (fov / 2) * (Math.PI / 180);// 視野角をラジアンに変換
const dist   = (height / 2) / Math.tan(fovRad);// ぴったりのカメラ距離
var model;

function initModel(scene, camera, renderer, modelPath){
  var loader = new GLTFLoader();
  loader.load(modelPath, function ( gltf ) {
    model = gltf.scene;
    var posx = width / 2
    var posy = height / 2
    model.scale.set(posx,posy,posy)
    model.position.set(0,-posy*0.9,0);
    scene.add( model );
  }, undefined, function ( error ) {
    console.error( error );
  } );
}

function main(){
  var scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xe0c1ff );
  
  var light = new THREE.HemisphereLight( 0xFFFFFF, 0x696969, 1.3);
  light.position.set( 0, 20, 0 );
  scene.add( light );
  
  var camera = new THREE.PerspectiveCamera( fov, width / height, 1, dist * 2 );
  camera.position.z = dist;
  
  var renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize( width, height );
  renderer.outputEncoding = THREE.sRGBEncoding;

  var mouse = new Vector2(0, 0);
  var mousedown = new Vector2(0, 0);
  var lastlotation = 0;
  var isDown = false;
  
  var mouseMoved = function(x, y) {
    mouse.x =  x - (width / 2);
    mouse.y = -y + (height / 2);
  }
  window.addEventListener('mousemove', e => {
    mouseMoved(e.clientX, e.clientY);
  });
  window.addEventListener('mousedown', e => {
    isDown = true;
    mousedown.x =  e.clientX - (width / 2);
    mousedown.y = -e.clientY + (height / 2);
    lastlotation = model.rotation.y;
  });
  window.addEventListener('mouseup', e => {
    isDown = false;
  });

  var animate = function () {
    requestAnimationFrame( animate );
    if(isDown){
      model.rotation.y = lastlotation + (mouse.x - mousedown.x) / 200;
    }
    else{    
    }
    renderer.render( scene, camera );
  };

  select.onchange = function(){
    var modelPath = select.value
    if(model){
      scene.remove(model)
    }
    initModel(scene, camera, renderer, modelPath)
  }
  select.onchange()

  animate();
}

main()

