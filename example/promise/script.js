var options = {
  canvasElement : document.querySelector('#myCanvas'),
  fSpyJsonPath: './camera.json',
};

var renderer = new THREE.WebGLRenderer({
  canvas: options.canvasElement,
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);
renderer.alpha = true;
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

var fSpyCamera = new FSpyCameraLoader();
fSpyCamera.setCanvas(options.canvasElement);
fSpyCamera.setResizeUpdate();

var promise1 = fSpyCamera.loadAsync(options.fSpyJsonPath);

var promise2 = new Promise( function( resolve , reject ){
  setTimeout( function(){
    resolve();
  },1000);
});

Promise.all([promise1,promise2]).then(function(){
  var scene = new THREE.Scene();
  var camera = fSpyCamera.camera;
  var geometry = new THREE.BoxGeometry(3, 3, 3);
  var material = new THREE.MeshNormalMaterial();
  var box = new THREE.Mesh(geometry, material);
  box.position.set(0, 0, 0);
  scene.add(box);

  var size = 100;
  var divisions = 10;

  var gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  camera.translateX(3)

  anim();

  function anim() {
    requestAnimationFrame(anim);
    renderer.render(scene, camera);
    // box.rotation.y += 0.01;
  }
});