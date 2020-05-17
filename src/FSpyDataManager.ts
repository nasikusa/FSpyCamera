import { Matrix4, Vector3, MathUtils, Vector2 } from 'three';
import { FSpyCameraJson, DataManager, FSpyJsonTransformRows, FSpyCameraData } from './type';
import { defaultCameraParams } from './const';

export default class FSpyDataManager implements DataManager {
  private rawData: FSpyCameraJson | null;

  private data: FSpyCameraData | null;

  private internalImageRatio: number;

  private internalCameraFov: number;

  private internalOriginalImageSize: Vector2;

  private internalCameraTransformMatrix: Matrix4;

  private internalViewTransformMatrix: Matrix4;

  private internalCameraPosition: Vector3;

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

  public setData(rawData: FSpyCameraJson): void {
    this.internalIsSetData = true;
    this.rawData = rawData;
    this.onSetData();
  }

  public removeData(): void {
    this.internalIsSetData = false;
    this.rawData = null;
    this.onRemoveData();
  }

  public getData(): FSpyCameraJson | null {
    return this.rawData;
  }

  public getComputedData(): FSpyCameraData | null {
    return this.data;
  }

  private setComputedData(): void {
    if (this.rawData != null) {
      this.data = ({} as unknown) as FSpyCameraData;
      this.data.principalPoint = new Vector2(this.rawData.principalPoint.x, this.rawData.principalPoint.y);
      this.data.viewTransform = this.internalViewTransformMatrix;
      this.data.cameraTransform = this.internalCameraTransformMatrix;
      this.data.horizontalFieldOfView = this.rawData.horizontalFieldOfView;
      this.data.verticalFieldOfView = this.rawData.verticalFieldOfView;
      this.data.vanishingPoints = [
        new Vector2(this.rawData.vanishingPoints[0].x, this.rawData.vanishingPoints[0].y),
        new Vector2(this.rawData.vanishingPoints[1].x, this.rawData.vanishingPoints[1].y),
        new Vector2(this.rawData.vanishingPoints[2].x, this.rawData.vanishingPoints[2].y),
      ];
      (this.data.vanishingPointAxes = [
        this.rawData.vanishingPointAxes[0],
        this.rawData.vanishingPointAxes[1],
        this.rawData.vanishingPointAxes[2],
      ]),
        (this.data.relativeFocalLength = this.rawData.relativeFocalLength);
      this.data.imageWidth = this.rawData.imageWidth;
      this.data.imageHeight = this.rawData.imageHeight;
      this.data.imageSize = this.internalOriginalImageSize;
      this.data.imageRatio = this.internalImageRatio;
      this.data.cameraPosition = this.internalCameraPosition;
      this.data.cameraFov = this.internalCameraFov;
    }
  }

  private onSetData(): void {
    this.internalImageRatio = this.calcImageRatio();
    if (this.rawData != null) {
      this.internalOriginalImageSize = new Vector2(this.rawData.imageWidth, this.rawData.imageHeight);
      this.internalCameraFov = FSpyDataManager.getVFovDegFromRad(this.rawData.verticalFieldOfView);
      this.setTransformMatrix(this.rawData.cameraTransform.rows, this.internalCameraTransformMatrix);
      this.setTransformMatrix(this.rawData.viewTransform.rows, this.internalViewTransformMatrix);
      this.setCameraPosition();
      this.setComputedData();
    }
  }

  private onRemoveData(): void {
    this.internalImageRatio = defaultCameraParams.aspect;
    this.internalCameraFov = defaultCameraParams.fov;
    this.internalOriginalImageSize = new Vector2();
    this.internalCameraTransformMatrix = new Matrix4();
    this.internalViewTransformMatrix = new Matrix4();
    this.internalCameraPosition = new Vector3();
    this.data = null;
  }

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

  private setTransformMatrix(transformArray: FSpyJsonTransformRows, matrix: Matrix4): Matrix4 {
    if (this.rawData != null) {
      const mtxArray: FSpyJsonTransformRows = transformArray;
      const preArray: number[] = [];
      const matrixArray = mtxArray.reduce((pre: number[], curernt: number[]) => {
        pre.push(...curernt);
        return pre;
      }, preArray);
      matrix.elements = matrixArray;

      return matrix;
    }
    return new Matrix4();
  }

  private setCameraPosition(): void {
    if (this.rawData != null) {
      const mtxArray = this.rawData.cameraTransform.rows;
      this.internalCameraPosition = new Vector3(mtxArray[0][3], mtxArray[1][3], mtxArray[2][3]);
    }
  }

  public get imageRatio(): number {
    return this.internalImageRatio;
  }

  public get rotationMatrix(): Matrix4 {
    return this.cameraMatrix;
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
