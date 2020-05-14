var options = {
  canvasElement: document.querySelector('#myCanvas'),
  fSpyJsonPath: '../assets/json/river.json',
};

var camera;

var renderer = new THREE.WebGLRenderer({
  canvas: options.canvasElement,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);

var geometry = new THREE.BoxGeometry(3, 3, 3);
var material = new THREE.MeshNormalMaterial();
var box = new THREE.Mesh(geometry, material);
box.position.set(0, 0, 0);
var scene = new THREE.Scene();
scene.add(box);

var fSpyCameraLoader = new FSpyCameraLoader();
fSpyCameraLoader.setCanvas(options.canvasElement);
fSpyCameraLoader.setResizeUpdate();
fSpyCameraLoader.load(options.fSpyJsonPath, function (result) {
  camera = result;
  renderLoop();
});

window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function renderLoop() {
  requestAnimationFrame(renderLoop);
  renderer.render(scene, camera);
  box.rotation.y += 0.01;
}
