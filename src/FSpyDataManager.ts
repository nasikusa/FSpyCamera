import { Vector2, Vector3, Matrix4, MathUtils } from 'three';
import {
  FSpyCameraJson,
  DataManager,
  FSpyJsonTransformRows,
  FSpyCameraData,
} from './type';
import { defaultCameraParams } from './const';

/**
 * A class that stores the camera data of fSpy and processes it for three.js
 */
export default class FSpyDataManager implements DataManager {
  /**
   * json data output from fSpy
   */
  private rawData: FSpyCameraJson | null;

  /**
   * json data from fSpy converted to data for three.js
   */
  private data: FSpyCameraData | null;

  /**
   * Image ratio
   */
  private internalImageRatio: number;

  /**
   * Camera viewing angle
   */
  private internalCameraFov: number;

  /**
   * Image size
   */
  private internalOriginalImageSize: Vector2;

  /**
   * Camera matrix
   */
  private internalCameraTransformMatrix: Matrix4;

  /**
   * View matrix
   */
  private internalViewTransformMatrix: Matrix4;

  /**
   * Camera position
   */
  private internalCameraPosition: Vector3;

  /**
   * bool value indicating whether fSpy data was stored
   */
  private internalIsSetData: boolean;

  constructor() {
    this.rawData = null;
    this.data = null;
    this.internalImageRatio = defaultCameraParams.aspect;
    this.internalCameraFov = defaultCameraParams.fov;
    this.internalOriginalImageSize = new Vector2();
    this.internalCameraTransformMatrix = new Matrix4();
    this.internalViewTransformMatrix = new Matrix4();
    this.internalCameraPosition = new Vector3();
    this.internalIsSetData = false;
  }

  /**
   * Set json data from fSpy
   * @param rawData json data output from fSpy
   */
  public setData(rawData: FSpyCameraJson): void {
    this.internalIsSetData = true;
    this.rawData = rawData;
    this.onSetData();
  }

  /**
   * Remove json data from fSpy
   */
  public removeData(): void {
    this.internalIsSetData = false;
    this.rawData = null;
    this.onRemoveData();
  }

  /**
   * Get unprocessed internal camera data
   */
  public getData(): FSpyCameraJson | null {
    return this.rawData;
  }

  /**
   * Get camera data processed for three.js
   */
  public getComputedData(): FSpyCameraData | null {
    return this.data;
  }

  /**
   * Get camera data processed for three.js
   */
  private setComputedData(): void {
    if (this.rawData != null) {
      this.data = ({} as unknown) as FSpyCameraData;
      this.data.principalPoint = new Vector2(
        this.rawData.principalPoint.x,
        this.rawData.principalPoint.y
      );
      this.data.viewTransform = this.internalViewTransformMatrix;
      this.data.cameraTransform = this.internalCameraTransformMatrix;
      this.data.horizontalFieldOfView = this.rawData.horizontalFieldOfView;
      this.data.verticalFieldOfView = this.rawData.verticalFieldOfView;
      this.data.vanishingPoints = [
        new Vector2(
          this.rawData.vanishingPoints[0].x,
          this.rawData.vanishingPoints[0].y
        ),
        new Vector2(
          this.rawData.vanishingPoints[1].x,
          this.rawData.vanishingPoints[1].y
        ),
        new Vector2(
          this.rawData.vanishingPoints[2].x,
          this.rawData.vanishingPoints[2].y
        ),
      ];
      this.data.vanishingPointAxes = [
        this.rawData.vanishingPointAxes[0],
        this.rawData.vanishingPointAxes[1],
        this.rawData.vanishingPointAxes[2],
      ];
      this.data.relativeFocalLength = this.rawData.relativeFocalLength;
      this.data.imageWidth = this.rawData.imageWidth;
      this.data.imageHeight = this.rawData.imageHeight;
      this.data.imageSize = this.internalOriginalImageSize;
      this.data.imageRatio = this.internalImageRatio;
      this.data.cameraPosition = this.internalCameraPosition;
      this.data.cameraFov = this.internalCameraFov;
    }
  }

  /**
   * Function that works when data from fSpy is set
   */
  private onSetData(): void {
    this.internalImageRatio = this.calcImageRatio();
    if (this.rawData != null) {
      this.internalOriginalImageSize = new Vector2(
        this.rawData.imageWidth,
        this.rawData.imageHeight
      );
      this.internalCameraFov = FSpyDataManager.getVFovDegFromRad(
        this.rawData.verticalFieldOfView
      );
      this.setTransformMatrix(
        this.rawData.cameraTransform.rows,
        this.internalCameraTransformMatrix
      );
      this.setTransformMatrix(
        this.rawData.viewTransform.rows,
        this.internalViewTransformMatrix
      );
      this.setCameraPosition(this.internalCameraTransformMatrix);
      this.setComputedData();
    }
  }

  /**
   * Function that works when data from fSpy is removed
   */
  private onRemoveData(): void {
    this.internalImageRatio = defaultCameraParams.aspect;
    this.internalCameraFov = defaultCameraParams.fov;
    this.internalOriginalImageSize = new Vector2();
    this.internalCameraTransformMatrix = new Matrix4();
    this.internalViewTransformMatrix = new Matrix4();
    this.internalCameraPosition = new Vector3();
    this.data = null;
  }

  /**
   * Calculate image ratio
   * @return image ratio
   */
  private calcImageRatio(): number {
    if (this.rawData != null) {
      const w: number = this.rawData.imageWidth;
      const h: number = this.rawData.imageHeight;
      return w / h;
    }
    return defaultCameraParams.aspect;
  }

  private static getVFovDegFromRad(radians: number): number {
    return MathUtils.radToDeg(radians);
  }

  /**
   * Transform matrix data of transform of fSpy into Matrix4 of three.js.
   * @param transformArray Matrix data from the underlying fSpy
   * @param matrix Matrix data object to be set
   * @return Returns the matrix object passed as the second argument. If it fails for any reason, it returns empty matrix data.
   */
  private setTransformMatrix(
    transformArray: FSpyJsonTransformRows,
    matrix: Matrix4
  ): Matrix4 {
    if (this.rawData != null) {
      const matrixData: Matrix4 = matrix;
      const mtxArray: FSpyJsonTransformRows = transformArray;
      const preArray: number[] = [];
      const matrixArray = mtxArray.reduce(
        (pre: number[], curernt: number[]) => {
          pre.push(...curernt);
          return pre;
        },
        preArray
      );
      matrixData.set(
        matrixArray[0],
        matrixArray[1],
        matrixArray[2],
        matrixArray[3],
        matrixArray[4],
        matrixArray[5],
        matrixArray[6],
        matrixArray[7],
        matrixArray[8],
        matrixArray[9],
        matrixArray[10],
        matrixArray[11],
        matrixArray[12],
        matrixArray[13],
        matrixArray[14],
        matrixArray[15]
      );

      return matrixData;
    }
    return new Matrix4();
  }

  /**
   * Set the camera position
   * @return camera position vector3
   */
  private setCameraPosition(cameraMatrix: Matrix4): Vector3 {
    if (this.rawData != null) {
      const matrixElements: number[] = cameraMatrix.elements;
      // see : https://threejs.org/docs/#api/en/math/Matrix4
      this.internalCameraPosition = new Vector3(
        matrixElements[12],
        matrixElements[13],
        matrixElements[14]
      );
    }
    return this.internalCameraPosition;
  }

  /**
   * get image rato data
   */
  public get imageRatio(): number {
    return this.internalImageRatio;
  }

  public get cameraMatrix(): Matrix4 {
    return this.internalCameraTransformMatrix;
  }

  public get viewMatrix(): Matrix4 {
    return this.internalViewTransformMatrix;
  }

  public get cameraFov(): number {
    return this.internalCameraFov;
  }

  public get cameraPosition(): Vector3 {
    return this.internalCameraPosition;
  }

  public get isSetData(): boolean {
    return this.internalIsSetData;
  }

  public get imageSize(): Vector2 {
    return this.internalOriginalImageSize;
  }

  public get imageWidth(): number {
    return this.internalOriginalImageSize.width;
  }

  public get imageHeight(): number {
    return this.internalOriginalImageSize.height;
  }
}
