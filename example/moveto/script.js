var options = {
  wrapperElement: document.querySelector('#canvasWrapper'),
  canvasElement : document.querySelector('#myCanvas'),
  fSpyJsonPath: '../assets/json/river.json',
  renderSize: {
    width: 600 * 1.5,
    height: 600,
  },
};

var scene , camera , box;

var renderer = new THREE.WebGLRenderer({
  canvas: options.canvasElement,
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);
renderer.alpha = true;
if( window.innerWidth < 600 ){
  options.renderSize.width = window.innerWidth * 1.5;
  options.renderSize.height = window.innerWidth;
}
renderer.setSize( options.renderSize.width , options.renderSize.height );


window.addEventListener('resize', function() {
  if( window.innerWidth < 600 ){
    options.renderSize.width = window.innerWidth * 1.5;
    options.renderSize.height = window.innerWidth;
    renderer.setSize(options.renderSize.width , options.renderSize.height);
  }
});

var fSpyCameraLoader = new FSpyCameraLoader();
fSpyCameraLoader.setCanvas(options.canvasElement);
fSpyCameraLoader.setResizeUpdate();

fSpyCameraLoader.load( options.fSpyJsonPath , function() {
  scene = new THREE.Scene();
  camera = fSpyCameraLoader.camera;
  var geometry = new THREE.BoxGeometry(3, 3, 3);
  var material = new THREE.MeshNormalMaterial();
  box = new THREE.Mesh(geometry, material);
  box.position.set(0, 0, 0);
  scene.add(box);

  anim();

});

function anim() {
  requestAnimationFrame(anim);
  renderer.render(scene, camera);
  box.rotation.y += 0.01;
}