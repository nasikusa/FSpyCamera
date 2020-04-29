# FSpyCamera

## What is this?

Script for importing [fSpy](https://fspy.io/) camera data into [three.js](https://threejs.org/).

## Getting started

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FSpyCamera DEMO</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    #canvas {
      background-image: url(./basic/image.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
    }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script src="../node_modules/three/build/three.js"></script>
  <script src="../dist/FSpyCamera.js"></script>
  <script src="./script.js"></script>
</body>
</html>

```

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