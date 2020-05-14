import { Matrix4, Vector3, MathUtils } from 'three';
import { FSpyCameraJson, DataManager } from './type';
import { defaultCameraParams } from './const';

export default class FSpyDataManager implements DataManager {
  private data: FSpyCameraJson | null;
  private internalImageRatio: number;
  private internalCameraFov: number;
  private radian: number;
  private internalRotationMatrix: Matrix4;
  private internalCameraPosition: Vector3;
  private internalIsSetData: boolean;

  constructor() {
    this.data = null;
    this.internalImageRatio = defaultCameraParams.aspect;
    this.internalCameraFov = defaultCameraParams.fov;
    this.radian = 0;
    this.internalRotationMatrix = new Matrix4();
    this.internalCameraPosition = new Vector3();
    this.internalIsSetData = false;
  }

  public setData(data: FSpyCameraJson): void {
    this.internalIsSetData = true;
    this.data = data;
    this.onSetData();
  }

  public removeData(): void {
    this.internalIsSetData = false;
    this.data = null;
    this.onRemoveData();
  }

  public getData(): FSpyCameraJson | null {
    return this.data;
  }

  protected onSetData(): void {
    this.internalImageRatio = this.calcImageRatio();
    if (this.data != null) {
      this.internalCameraFov = this.getVFovDegFromRad(this.data.verticalFieldOfView);
      this.setMatrix();
      this.setCameraPosition();
    }
  }

  protected onRemoveData(): void {
    this.internalImageRatio = defaultCameraParams.aspect;
    this.internalCameraFov = defaultCameraParams.fov;
    this.internalRotationMatrix = new Matrix4();
    this.internalCameraPosition = new Vector3();
  }

  protected calcImageRatio(): number {
    if (this.data != null) {
      const w: number = this.data.imageWidth;
      const h: number = this.data.imageHeight;
      return w / h;
    }
    return defaultCameraParams.aspect;
  }

  protected getVFovDegFromRad(radians: number): number {
    this.radian = MathUtils.radToDeg(radians);
    return this.radian;
  }

  /**
   * マトリックスオブジェクトに数字をセットする
   * @return {THREE.Matrix4} パラメータがセットされたMatrix4を返す
   */
  protected setMatrix(): Matrix4 {
    if (this.data != null) {
      const mtxArray = this.data.cameraTransform.rows;
      const preArray: number[] = [];
      const matrixArray = mtxArray.reduce((pre, curernt) => {
        pre.push(...curernt);
        return pre;
      }, preArray);
      this.internalRotationMatrix.elements = matrixArray;

      return this.internalRotationMatrix;
    }

    return new Matrix4();
  }

  protected setCameraPosition(): void {
    if (this.data != null) {
      const mtxArray = this.data.cameraTransform.rows;
      this.internalCameraPosition = new Vector3(mtxArray[0][3], mtxArray[1][3], mtxArray[2][3]);
    }
  }

  public get imageRatio(): number {
    return this.internalImageRatio;
  }

  public get rotationMatrix(): Matrix4 {
    return this.internalRotationMatrix;
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
}
