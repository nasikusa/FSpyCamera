const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'),
    alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0x000000 , 0 );
renderer.alpha = true;
// this.renderer.setSize(this.winWidth, this.winWidth / this.fspyRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(window.innerWidth,500);
renderer.setClearColor( 0x000000 , 0 );

window.addEventListener('resize',function(){
  renderer.setSize(window.innerWidth,500);
})

const camera = new FSpyCamera( document.querySelector('#myCanvas'));

camera.load("camera.json" , function(ts){

  console.log(ts);


  const scene = new THREE.Scene();
  const camera = ts.camera;

  console.log(2.5);
  
  const geometry = new THREE.BoxGeometry(3,3,3);
  const material = new THREE.MeshNormalMaterial();
  const box = new THREE.Mesh(geometry, material);
  box.position.set(0 , 0 , 0);
  scene.add(box);

  // const geometry2 = new THREE.BoxGeometry(1,3,1);
  // const material2 = new THREE.MeshNormalMaterial();
  // const box2 = new THREE.Mesh(geometry2, material2);
  // box2.position.set(0 , 0 , -2);
  // scene.add(box2);

  // const geometry3 = new THREE.BoxGeometry(4,2,2);
  // const material3 = new THREE.MeshNormalMaterial();
  // const box3 = new THREE.Mesh(geometry3, material3);
  // box3.position.set(4 , 0 , 4);
  // scene.add(box3);

  console.log(box);

  var size = 100;
var divisions = 10;

var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

  console.log(renderer);
  // camera.lookAt(0,0,0);

  anim();

  function anim() {
    requestAnimationFrame(anim);
    renderer.render( scene , camera );
    box.rotation.y += 0.01;
    // box.position.x += 0.035
    // box2.position.z += 0.035
    // box3.position.z -= 0.035
    // console.log(box);
    // console.log("a");
  }

});