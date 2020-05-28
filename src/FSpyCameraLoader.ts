import { Loader, FileLoader, PerspectiveCamera, Vector2, LoadingManager } from 'three';

import FSpyDataManager from 'FSpyDataManager';
import { FSpyCameraJson } from 'type';
import { defaultCameraParams } from 'const';

export default class FSpyCamerLoader extends Loader {

  /**
   * PerspectiveCamera of three.js. The final result is stored on this camera.
   */
  public camera: PerspectiveCamera;

  public targetCanvasSize: Vector2;

  /**
   * Canvas that is the target for drawing WebGL
   */
  public targetCanvas: HTMLCanvasElement | null;

  /**
   * Class that manages camera data of fSpy
   */
  protected dataManager: FSpyDataManager;

  constructor(manager?: LoadingManager) {
    super();

    Loader.call(this, manager);
    this.targetCanvas = null;
    this.targetCanvasSize = new Vector2();
    this.camera = new PerspectiveCamera();
    this.dataManager = new FSpyDataManager();
  }

  /**
   * load fSpy's camera data json
   * @param url Path to camera data json to be exported by fSpy
   * @param onLoad Function after loading
   * @param onProgress Function being loaded. Probably not needed due to the small data size.
   * @param onError Function when the error occurred
   */
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
        onLoad(this.parse((resultJson as unknown) as FSpyCameraJson));
      },
      onProgress,
      onError
    );
  }

  /**
   * Parses fSpy json data. This function is also called after the load function.
   * @param fSpyJson json data from fSpy. Please put the parsed one, such as JSON.parse (json) ;.
   * @return Camera using fSpy camera data
   */
  public parse(fSpyJson: FSpyCameraJson): PerspectiveCamera {
    this.dataManager.setData(fSpyJson);
    return this.createCamera();
  }

  /**
   * Add the data for the canvas element for the library to know.
   * @param canvas  Canvas that is the target for drawing WebGL
   */
  public setCanvas(canvas: HTMLCanvasElement): void {
    this.targetCanvas = canvas;
  }

  /**
   * Remove the data for the canvas element.
   */
  public removeCanvas(): void {
    this.targetCanvas = null;
  }

  /**
   * Enables the ability to change the camera data according to the size of the canvas to render.
   */
  public setResizeUpdate(): void {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  /**
   * Disables the ability to change camera data to fit the size of the canvas to render.
   */
  public removeResizeupdate(): void {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  /**
   * Create a PerspectiveCamera of three.js from the camera data of fSpy.
   * @return Camera using fSpy camera data
   */
  protected createCamera(): PerspectiveCamera {
    if (this.dataManager.isSetData) {
      this.camera.fov = this.dataManager.cameraFov;
      if (this.targetCanvasSize != null) {
        this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
      } else {
        this.camera.aspect = this.dataManager.imageRatio;
      }
      this.camera.position.set(
        this.dataManager.cameraPosition.x,
        this.dataManager.cameraPosition.y,
        this.dataManager.cameraPosition.z
      );
      this.camera.setRotationFromMatrix(this.dataManager.rotationMatrix);
      this.onResize();
    }
    return this.camera;
  }

  /**
   * Change the camera data according to the size of the canvas to render.
   */
  public onResize(): void {
    if (this.targetCanvas != null) {
      const rect: DOMRect = this.targetCanvas.getBoundingClientRect();
      const fSpyImageRatio: number = this.dataManager.imageRatio;

      this.targetCanvasSize.setX(rect.width);
      this.targetCanvasSize.setY(rect.height);

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
