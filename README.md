# FSpyCameraLoader

## What is this?

Script for importing [fSpy](https://fspy.io/) camera data into [three.js](https://threejs.org/).

## Getting started

```css
html,body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
#myCanvas {
  width: 100%;
  height: 100%;
  background-image: url(path/to/image);
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
```

```javascript
var options = {
  canvasElement: document.querySelector('#myCanvas'),
  fSpyJsonPath: 'path/to/fSpyJson',
};

var scene, camera, box;

var renderer = new THREE.WebGLRenderer({
  canvas: options.canvasElement,
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);
renderer.alpha = true;
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

var fSpyCameraLoader = new FSpyCameraLoader();
fSpyCameraLoader.setCanvas(options.canvasElement);
fSpyCameraLoader.setResizeUpdate();

fSpyCameraLoader.load(options.fSpyJsonPath, function () {
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

```

## browser

IE11+,edge,Chrome,FireFox,safari

## LISENCE

MIT