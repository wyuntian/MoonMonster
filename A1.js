/*
 * UBC CPSC 314, Vsep2017
 * Assignment 1 Template
 */

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer( {alpha: true});
//renderer.setClearColor(0xFFFFFF,0.9); // white background colour
renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(45,20,40);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

// WORLD COORDINATE FRAME: other objects are defined with respect to it
var worldFrame = new THREE.AxisHelper(5) ;
scene.add(worldFrame);

// FLOOR WITH PATTERN
var floorTexture = new THREE.ImageUtils.loadTexture('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(30, 30);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.1;
floor.rotation.x = Math.PI / 2;
//scene.add(floor);
floor.parent = worldFrame;

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////

// UNIFORMS
var lightPosition = {type: 'v3', value: new THREE.Vector3(0,4,10)};
var u_time = {type: 'f', value: 0.0};
//uniform vec2 u_mouse;
//uniform vec2 u_resolution;


// MATERIALS
var armadilloMaterial = new THREE.ShaderMaterial({
    uniforms:{
        lightPosition:lightPosition,
        u_time:u_time,
    },
});

var lightbulbMaterial = new THREE.ShaderMaterial({
   uniforms: {
    lightPosition: lightPosition,
       u_time:u_time,
  },
});

// LOAD SHADERS
var shaderFiles = [
  'glsl/armadillo.vs.glsl',
  'glsl/armadillo.fs.glsl',
  'glsl/lightbulb.vs.glsl',
  'glsl/lightbulb.fs.glsl',

];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/armadillo.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/armadillo.fs.glsl'];

  //armadilloColorMaterial.vertexShader = shaders['glsl/armadillocolor.vs.glsl'];     //creative
  //armadilloColorMaterial.fragmentShader = shaders['glsl/armadillocolor.fs.glsl'];   //creative

  lightbulbMaterial.vertexShader = shaders['glsl/lightbulb.vs.glsl'];
  lightbulbMaterial.fragmentShader = shaders['glsl/lightbulb.fs.glsl'];
})

// LOAD ARMADILLO
function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.parent = worldFrame;
    scene.add(object);

  }, onProgress, onError);
}

loadOBJ('obj/armadillo.obj', armadilloMaterial, 3, 0,-3,0, 0,Math.PI,0);


//loadOBJ('obj/armadillo.obj', armadilloMaterial, 3, 0,-3,0, 0,Math.PI,0);


//create another armadillo next to the current one

// CREATE light
var lightbulbGeometry = new THREE.SphereGeometry(1, 32, 32);
var lightbulb = new THREE.Mesh(lightbulbGeometry, lightbulbMaterial);
lightbulb.parent = worldFrame;
scene.add(lightbulb);

var isRotate = false;

// LISTEN TO KEYBOARD
var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W"))
    lightPosition.value.z -= 0.1;
  else if (keyboard.pressed("S"))
    lightPosition.value.z += 0.1;

  if (keyboard.pressed("A"))
    lightPosition.value.x -= 0.1;
  else if (keyboard.pressed("D"))
    lightPosition.value.x += 0.1;

    if (keyboard.pressed("R")) {
        isRotate = true;

    }

  lightbulbMaterial.needsUpdate = true; // Tells three.js that some uniforms might have changed
}

/*
var xAxis = new THREE.Vector3(lightPosition.value-(lightPosition.value-(0,1,0)));
function rotateLight(){
    lightbulb.rotateOnAxis(xAxis,Math.PI/280);
}
*/

// SETUP UPDATE CALL-BACK
function update() {
    checkKeyboard();
    u_time.value=u_time.value+0.03;
    if(isRotate===true) {
        lightbulb.rotation.y += 0.01;
    }
    //rotateLight();
    requestAnimationFrame(update);
    renderer.render(scene, camera);

}

update();

