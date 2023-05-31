import * as THREE from 'three'
import GUI from 'lil-gui'

let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

function init() {
  const scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, -50, 0);
  camera.lookAt(scene.position);
  renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshLambertMaterial({color: 0xc38743});
  const donut = new THREE.Mesh(geometry, material);
  donut.position.set(0, 0, 0);
  donut.rotation.x = Math.PI / 10 * 3;
  scene.add(donut);

  const light = new THREE.DirectionalLight("#ffffff");
  light.position.set(0, -200, 0);
  scene.add(light);

  // scene.add(new THREE.AxesHelper(40));

  document.getElementById("WebGL-output")?.appendChild(renderer.domElement);

  let step = 0;
  const control = { rotationSpeed : 50 };
  const gui = new GUI();
  gui.add(control, 'rotationSpeed', 0, 100);

  render();


  function render() {
    step += control.rotationSpeed / 250;
    donut.rotation.y = step;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize);
