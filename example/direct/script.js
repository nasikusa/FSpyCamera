var options = {
  canvasElement: document.querySelector('#myCanvas'),
};

var jsonData = JSON.parse(`
{
  "principalPoint": {
    "x": 0,
    "y": 0
  },
  "viewTransform": {
    "rows": [
      [
        -0.973413820702548,
        0.09650546518281947,
        -0.2077311456068043,
        1.671711489614533
      ],
      [
        0.04196681158657708,
        -0.8164170790874034,
        -0.5759357079567554,
        1.701876094251098
      ],
      [
        -0.22517619854355025,
        -0.5693415918095568,
        0.7906616415668813,
        -10
      ],
      [
        0,
        0,
        0,
        1
      ]
    ]
  },
  "cameraTransform": {
    "rows": [
      [
        -0.9734138207025481,
        0.04196681158657723,
        -0.22517619854355045,
        -0.6959172306086093
      ],
      [
        0.0965054651828195,
        -0.8164170790874036,
        -0.5693415918095569,
        -4.4653045032151235
      ],
      [
        -0.2077311456068041,
        -0.5759357079567556,
        0.7906616415668815,
        9.234054171727681
      ],
      [
        0,
        0,
        0,
        1
      ]
    ]
  },
  "horizontalFieldOfView": 1.3678550657796624,
  "verticalFieldOfView": 1.097495385241209,
  "vanishingPoints": [
    {
      "x": 0.3222986638911469,
      "y": 0.8935747627994785
    },
    {
      "x": -5.303011682125709,
      "y": 0.22862885996889182
    },
    {
      "x": 0.20793450169726774,
      "y": -1.7590846093077017
    }
  ],
  "vanishingPointAxes": [
    "zNegative",
    "xPositive",
    "yNegative"
  ],
  "relativeFocalLength": 1.2267259679457512,
  "imageWidth": 4032,
  "imageHeight": 3024
}
`);

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

var fSpyCameraLoader = new FSpyCameraLoader(options.canvasElement);
fSpyCameraLoader.setCanvas(options.canvasElement);
fSpyCameraLoader.setResizeUpdate();

fSpyCameraLoader.parse(jsonData);

var scene = new THREE.Scene();
var camera = fSpyCameraLoader.camera;
var geometry = new THREE.BoxGeometry(3, 3, 3);
var material = new THREE.MeshNormalMaterial();
var box = new THREE.Mesh(geometry, material);
box.position.set(0, 0, 0);
scene.add(box);

anim();

function anim() {
  requestAnimationFrame(anim);
  renderer.render(scene, camera);
  box.rotation.y += 0.01;
}
