import { Loader, FileLoader, PerspectiveCamera, Vector2 } from 'three';

import FSpyDataManager from 'FSpyDataManager';
import { FSpyCameraJson } from 'type';
import { defaultCameraParams } from 'const';

export default class FSpyCamerLoader extends Loader {
  public camera: PerspectiveCamera;
  public targetCanvasSize: Vector2;
  public targetCanvas: HTMLCanvasElement | null;
  protected targetCanvasRect: ClientRect | null;
  protected dataManager: FSpyDataManager;

  constructor(manager?: any) {
    super();

    Loader.call(this, manager);
    this.targetCanvas = null;
    this.targetCanvasRect = null;
    this.targetCanvasSize = new Vector2();
    this.camera = new PerspectiveCamera();
    this.dataManager = new FSpyDataManager();
  }

  public load(
    url: string,
    onLoad: (camera: PerspectiveCamera) => void,
    onProgress: () => void,
    onError: () => void
  ): void {
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType('json');
    loader.load(
      url,
      (resultJson) => {
        const json: unknown = resultJson;
        onLoad(this.parse(json as FSpyCameraJson));
      },
      onProgress,
      onError
    );
  }

  public parse(fSpyJson: FSpyCameraJson): PerspectiveCamera {
    this.dataManager.setData(fSpyJson);
    this.createCamera();
    return this.camera;
  }

  public setCanvas(canvas: HTMLCanvasElement) {
    this.targetCanvas = canvas;
  }

  public removeCanvas(): void {
    this.targetCanvas = null;
  }

  public setResizeUpdate(canvas?: HTMLCanvasElement) {
    if (canvas) {
      this.setCanvas(canvas);
    }
    window.addEventListener('resize', this.onResize.bind(this));
  }

  public removeResizeupdate(canvas?: HTMLCanvasElement) {
    if (canvas) {
      this.removeCanvas();
    }
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  /**
   * three.jsのカメラを作成する関数
   * @return {void}
   */
  createCamera(): void {
    if (this.dataManager.isSetData) {
      this.camera.fov = this.dataManager.cameraFov;
      if (this.targetCanvasSize != null) {
        this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
      } else {
        this.camera.aspect = defaultCameraParams.aspect;
      }
      this.camera.position.set(
        this.dataManager.cameraPosition.x,
        this.dataManager.cameraPosition.y,
        this.dataManager.cameraPosition.z
      );
      this.camera.setRotationFromMatrix(this.dataManager.rotationMatrix);
      this.onResize();
    }
  }

  /**
   * リサイズした際に発火する関数
   * @return {void}
   */
  onResize(): void {
    if (this.targetCanvas != null) {
      this.targetCanvasRect = this.targetCanvas.getBoundingClientRect();
      const fSpyImageRatio: number = this.dataManager.imageRatio;

      this.targetCanvasSize.setX(this.targetCanvasRect.width);
      this.targetCanvasSize.setY(this.targetCanvasRect.height);

      if (this.targetCanvasSize.x / this.targetCanvasSize.y <= fSpyImageRatio) {
        this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
        this.camera.zoom = defaultCameraParams.zoom;
      } else {
        this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
        this.camera.zoom = this.targetCanvasSize.x / this.targetCanvasSize.y / fSpyImageRatio;
      }
      this.camera.updateProjectionMatrix();
    }
  }
}
