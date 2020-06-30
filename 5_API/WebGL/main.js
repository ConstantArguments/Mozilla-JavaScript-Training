// create new scene
let scene = new THREE.Scene();

// create camera
/*
Four arguments:*
* The field of view: How wide the area in front of the camera is that should be visible onscreen, in degrees.
* The aspect ratio: Usually, this is the ratio of the scene's width divided by the scene's height.
  Using another value will distort the scene (which might be what you want, but usually isn't).
* The near plane: How close to the camera objects can be before we stop rendering them to the screen.
  Think about how when you move your fingertip closer and closer to the space between your eyes, eventually you can't see it anymore.
* The far plane: How far away things are from the camera before they are no longer rendered.
*/
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // 5 distance units out of the Z axis, which is out of the screen towards you

// renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // sets the size at which the renderer will draw the camera's view
document.body.appendChild(renderer.domElement); // appends the <canvas> element

// create cube
let cube;

let loader = new THREE.TextureLoader();

loader.load("metal003.png", function (texture) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  let geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
  let material = new THREE.MeshLambertMaterial({map: texture, shading: THREE.FlatShading});
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  draw();
});

// lighting
let light = new THREE.AmbientLight('rgb(255, 255, 255)'); // soft white light
scene.add(light);

let spotLight = new THREE.SpotLight('rgb(255, 255, 255)');
spotLight.position.set( 100, 1000, 1000 );
spotLight.castShadow = true;
scene.add(spotLight);

// draw it
function draw() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(draw);
}
