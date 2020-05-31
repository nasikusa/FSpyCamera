import {
  Scene,
  BoxGeometry,
  WebGLRenderer,
  MeshNormalMaterial,
  Mesh,
  PerspectiveCamera,
} from 'three';

import FSpyCameraLoader from 'three-fspy-camera-loader';
import { FSpyCameraJson } from 'three-fspy-camera-loader/dist/type';
import { renderSizeInterface } from './type';

export default class FSpyCameraLoaderExample {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private mesh: Mesh;
  private renderSize: renderSizeInterface;
  private targetCanvas: HTMLCanvasElement;
  private fSpyJson: FSpyCameraJson;
  private camera: PerspectiveCamera;
  private loader: FSpyCameraLoader;

  constructor(fSpyJson: FSpyCameraJson, targetCanvas: HTMLCanvasElement) {
    this.scene = new Scene();
    this.renderSize = this.setFullWindowRenderSize();
    this.targetCanvas = targetCanvas;
    this.renderer = this.createWebGLRenderer();
    this.fSpyJson = fSpyJson;
    this.mesh = this.createBox();
    this.loader = new FSpyCameraLoader();
    this.camera = this.createFSpyCamera();
    console.log(this.camera);

    this.setUpScene();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  setFullWindowRenderSize(
    sizeObject?: renderSizeInterface
  ): renderSizeInterface {
    const x = window.innerWidth;
    const y = window.innerHeight;
    if (sizeObject == null) {
      sizeObject = {
        x: 0,
        y: 0,
      };
    }
    sizeObject.x = x;
    sizeObject.y = y;
    return sizeObject;
  }

  createWebGLRenderer(renderer?: WebGLRenderer) {
    if (renderer == null) {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: this.targetCanvas,
      });
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(this.renderSize.x, this.renderSize.y);
    return renderer;
  }

  createFSpyCamera(): PerspectiveCamera {
    // important : If you want responsiveness, set the canvas before parsing.
    this.loader.setCanvas(this.targetCanvas);
    const camera = this.loader.parse(this.fSpyJson);
    return camera;
  }

  createBox() {
    const geometry = new BoxGeometry(0.5, 0.5, 0.5);
    const material = new MeshNormalMaterial();
    const mesh = new Mesh(geometry, material);
    return mesh;
  }

  setUpScene() {
    this.scene.add(this.mesh);
    this.scene.add(this.camera);
  }

  startAnimation() {
    requestAnimationFrame(this.startAnimation.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.mesh.rotation.y += 0.01;
  }

  onResize() {
    this.renderSize = this.setFullWindowRenderSize();
    this.renderer.setSize(this.renderSize.x, this.renderSize.y);
    this.loader.onResize();
  }
}
