var options = {
  canvasElement: document.querySelector('#myCanvas'),
  canvasImage: '../assets/img/stair.jpg',
  fSpyJsonPath: '../assets/json/stair.json',
  buttons: document.querySelectorAll('.js-button'),
};

var camera, controls;

var rect = options.canvasElement.getBoundingClientRect();

var renderer = new THREE.WebGLRenderer({
  canvas: options.canvasElement,
  alpha: true,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);
renderer.setSize(rect.width, rect.height);
renderer.shadowMap.enabled = true;

var box = createDefaultModel();
var shadowModel;
createShadowModel();
var scene = new THREE.Scene();
scene.add(box);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 5, 0);
light.castShadow = true;
scene.add(light);

var fSpyCameraLoader = new FSpyCameraLoader();
fSpyCameraLoader.setCanvas(options.canvasElement);

fSpyCameraLoader.load(options.fSpyJsonPath, onLoad);
window.addEventListener('resize', onResize);

function renderLoop() {
  requestAnimationFrame(renderLoop);
  renderer.render(scene, camera);
}

function onLoad(result) {
  camera = result;
  control = new THREE.TransformControls(camera, renderer.domElement);
  control.attach(box);
  if (window.innerWidth < 768) {
    control.size = 1.3;
  } else {
    control.size = 2;
  }
  control.setSpace('local');
  options.buttons.forEach(function (element) {
    element.addEventListener('click', setButtonEvents.bind(null, element));
  });
  scene.add(control);
  renderLoop();
}

function onResize() {
  rect = options.canvasElement.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height);
  fSpyCameraLoader.onResize();
  if (window.innerWidth < 768) {
    control.size = 1.3;
  } else {
    control.size = 2;
  }
}

function createDefaultModel() {
  var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  var material = new THREE.MeshNormalMaterial();
  var box = new THREE.Mesh(geometry, material);
  box.castShadow = true;
  box.position.set(2.5, -0.5, 2);
  box.rotation.y = 0.2;
  return box;
}

function createShadowModel() {
  var loader = new THREE.OBJLoader();
  loader.load('../assets/model/stair.obj', function (result) {
    var material = new THREE.ShadowMaterial();
    material.opacity = 0.3;
    var mesh = result.children[0];
    mesh.material = material;

    // temp
    mesh.position.x = 1.75;
    // temp
    mesh.rotation.y = -3;

    mesh.receiveShadow = true;
    shadowModel = mesh;
    scene.add(mesh);
  });
}

function setButtonEvents(element) {
  switch (element.dataset.action) {
    case 'translate':
      control.setMode('translate');
      break;
    case 'rotate':
      control.setMode('rotate');
      break;
    case 'scale':
      control.setMode('scale');
      break;
    case 'toggle-world-local':
      control.setSpace(control.space === 'local' ? 'world' : 'local');
      if (control.space === 'local') {
        document.querySelector('.js-local').style.color = '#0000ff';
        document.querySelector('.js-world').style.color = '#cccccc';
      } else {
        document.querySelector('.js-local').style.color = '#cccccc';
        document.querySelector('.js-world').style.color = '#0000ff';
      }
      break;
  }
}
