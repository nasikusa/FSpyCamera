import { Loader, FileLoader, PerspectiveCamera, Vector2, LoadingManager } from 'three';

import FSpyDataManager from './FSpyDataManager';
import { FSpyCameraJson, FSpyCameraData } from './type';
import { defaultCameraParams } from './const';
import AsyncFunction from './AsyncFunction';

export default class FSpyCamerLoader extends Loader {
  /**
   * PerspectiveCamera of three.js. The final result is stored on this camera.
   */
  public camera: PerspectiveCamera;

  /**
   * The size of the target canvas
   */
  public targetCanvasSize: Vector2;

  /**
   * Canvas that is the target for drawing WebGL
   */
  public targetCanvas: HTMLCanvasElement | null;

  /**
   * Class that manages camera data of fSpy
   */
  public dataManager: FSpyDataManager;

  /**
   * Flag whether the browser is IE
   */
  private isIE: boolean;

  /**
   * Resize event flag used internally
   */
  private internalIsEnableResizeEvent: boolean;

  constructor(manager?: LoadingManager) {
    super();

    Loader.call(this, manager);
    this.isIE = FSpyCamerLoader.getIsUseIE();
    this.targetCanvas = null;
    this.targetCanvasSize = new Vector2();
    this.camera = new PerspectiveCamera();
    this.dataManager = new FSpyDataManager();
    this.internalIsEnableResizeEvent = false;
  }

  /**
   * Gets whether the resize event is set
   */
  get isEnableResizeEvent(): boolean {
    return this.internalIsEnableResizeEvent;
  }

  /**
   * Enable / disable resize event
   */
  set isEnableResizeEvent(resizeEventBoolean: boolean) {
    if (this.internalIsEnableResizeEvent !== resizeEventBoolean) {
      this.internalIsEnableResizeEvent = resizeEventBoolean;
      if (this.internalIsEnableResizeEvent) {
        window.addEventListener('resize', this.onResize.bind(this));
      } else {
        window.removeEventListener('resize', this.onResize.bind(this));
      }
    }
  }

  /**
   * load fSpy's camera data json
   * @param url Path to camera data json to be exported by fSpy
   * @param onLoad Function after loading
   * @param onProgress Function being loaded. Probably not needed due to the small data size.
   * @param onError Function when the error occurred
   * TODO: IE
   */
  public load(
    url: string,
    onLoad?: (camera: PerspectiveCamera) => void,
    onProgress?: (xhr: object) => void,
    onError?: (error: ErrorEvent) => void
  ): void {
    if (this.isIE) {
      const loader = new AsyncFunction();
      loader.load(url, (resultJson) => {
        if (onLoad != null) {
          onLoad(this.parse((resultJson as unknown) as FSpyCameraJson));
        }
      });
    } else {
      const loader = new FileLoader(this.manager);
      loader.setPath(this.path);
      loader.setResponseType('json');
      loader.load(
        url,
        (resultJson) => {
          if (onLoad != null) {
            onLoad(this.parse((resultJson as unknown) as FSpyCameraJson));
          }
        },
        onProgress,
        onError
      );
    }
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
    this.isEnableResizeEvent = true;
  }

  /**
   * Disables the ability to change camera data to fit the size of the canvas to render.
   */
  public removeResizeupdate(): void {
    this.isEnableResizeEvent = false;
  }

  /**
   * Create a PerspectiveCamera of three.js from the camera data of fSpy.
   * @return Camera using fSpy camera data
   */
  protected createCamera(): PerspectiveCamera {
    if (this.dataManager.isSetData) {
      // set fov
      this.camera.fov = this.dataManager.cameraFov;

      // set aspect
      if (this.targetCanvasSize != null) {
        this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
      } else {
        this.camera.aspect = this.dataManager.imageRatio;
      }

      // set position
      this.camera.position.set(
        this.dataManager.cameraPosition.x,
        this.dataManager.cameraPosition.y,
        this.dataManager.cameraPosition.z
      );

      // set rotation
      this.camera.setRotationFromMatrix(this.dataManager.cameraMatrix);

      this.onResize();
    }
    return this.camera;
  }

  /**
   * Get if browser is IE
   * @return IE bool
   */
  private static getIsUseIE(): boolean {
    const ua: string = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('trident') >= 0) {
      return true;
    }
    return false;
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

  /**
   * Get unprocessed internal camera data
   * @return json data output from fSpy
   */
  public getData(): FSpyCameraJson | null {
    return this.dataManager.getData();
  }

  /**
   * Get camera data processed for three.js
   * @return json data from fSpy converted to data for three.js
   */
  public getComputedData(): FSpyCameraData | null {
    return this.dataManager.getComputedData();
  }
}
