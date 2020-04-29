# FSpyCamera

## What is this?

Script for importing [fSpy](https://fspy.io/) camera data into [three.js](https://threejs.org/).

## Getting started

```javascript
var canvas = document.querySelector('#canvas');
var renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000,0);
renderer.setSize(500,500);

var scene = new THREE.Scene();
var geo = new THREE.BoxGeometry(3,3,3);
var mat = new THREE.MeshNormalMaterial();
var box = new THREE.Mesh(geo,mat);
box.position.set(0,0,0);
scene.add(box);
var camera = null;

var fSpyCamera = new FSpyCamera( canvas );
fSpyCamera.load('./camera.json',function(){
  camera = fSpyCamera.camera;
  animation();
});

function animation(){
  requestAnimationFrame(animation);
  renderer.render( scene , camera );
  box.rotation.y += 0.01;
}
```

## browser

IE11+,edge,Chrome,FireFox,safari

## LISENCE

MIT