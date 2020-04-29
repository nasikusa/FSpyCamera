import * as THREE from 'three';
// import axios from 'axios';

import { FSpyCameraJson, FourElemArray } from './type';
import AsyncFunctions from './AsyncFunctions';
import { getType } from './utils/getType';
import { getExt } from './utils/getExt';

export default class FSpyCamera {
  /**
   * fSpyから取得したjsonオブジェクトを格納
   */
  public fSpyCameraData: FSpyCameraJson | null;

  /**
   * 第一引数にて渡された入力値
   */
  public inputData: string | FSpyCameraJson;

  /**
   * fSpyから取得データのアスペクトを収納
   */
  protected fspyImageRatio: number;

  /**
   * windowの幅を格納
   */
  protected winWidth: number;

  /**
   * windowの高さを格納
   */
  protected winHeight: number;

  /**
   * windowのアスペクトを格納
   */
  protected winRatio: number;

  /**
   * 行列オブジェクト
   */
  protected rotationMatrix: THREE.Matrix4;

  /**
   * three.jsのカメラ
   */
  public camera: THREE.PerspectiveCamera;

  /**
   * ターゲットとなるcanvas要素の幅
   */
  protected canvasWidth: number;

  /**
   * ターゲットとなるcanvas要素の高さ
   */
  protected canvasHeight: number;

  /**
   * fSpyデータ取得後に実行されるコールバックを格納
   */
  public callback: () => any;

  /**
   * カメラのFOVを格納
   */
  protected cameraFov: number;

  /**
   * 引数にて入れられたオプションを格納
   */
  public options: object;

  /**
   * ターゲットとなるcanvasを指定
   */
  public targetCanvas: HTMLCanvasElement;

  /**
   * カメラの行列データを格納
   */
  protected cameraTransforms: [
    FourElemArray<number>,
    FourElemArray<number>,
    FourElemArray<number>,
    FourElemArray<number>
  ];

  /**
   * 入力されたjsonの形式を格納
   */
  protected jsonType: string;

  protected targetCanvasRect: any;

  /**
   * 初期状態でのカメラのアスペクトを格納
   */
  protected initCameraAspect: number;

  constructor(canvasElement: HTMLCanvasElement, options: object = {}) {
    this.inputData = '';
    this.fspyImageRatio = 0;
    this.fSpyCameraData = null;
    this.rotationMatrix = new THREE.Matrix4();
    this.targetCanvas = canvasElement;
    this.targetCanvasRect = this.targetCanvas.getBoundingClientRect();
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.winRatio = this.winWidth / this.winHeight;
    this.camera = new THREE.PerspectiveCamera();
    this.canvasWidth = this.targetCanvasRect.width;
    this.canvasHeight = this.targetCanvasRect.height;
    this.cameraTransforms = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.options = options;
    this.callback = () => {};
    this.jsonType = getType(this.inputData);
    this.initCameraAspect = 0;
    this.cameraFov = 0;
  }

  /**
   * 非同期でfSpyのデータを取りに行く関数
   * @param jsonPathOrjsonData
   * @param callback
   */
  public load(jsonPathOrjsonData: string | FSpyCameraJson, callback: () => any): void {
    this.inputData = jsonPathOrjsonData;
    this.callback = callback;

    if (this.jsonType === 'string' && typeof this.inputData === 'string') {
      const ext: string = getExt(this.inputData);
      if (ext.toLowerCase() === 'json') {
        this.loadJson(this.inputData);
      } else if (ext.toLowerCase() === 'fspy') {
        FSpyCamera.loadBinary();
      }
    } else if (typeof this.inputData === 'object') {
      this.onLoadJson(this.inputData);
    } else {
      console.error("Please put fSpy's json path or parsed json in the first argument");
    }
  }

  /**
   * fSpyのjsonデータを取得する関数
   * @param {string} name カメラデータのパス
   * @return {void}
   */
  loadJson(path: string): void {
    const asyncFunctions = new AsyncFunctions();
    asyncFunctions.open(path, this.onLoadJson.bind(this));
  }

  /**
   * fSpyのbinaryデータを取得する関数
   * @param {string} name カメラデータのパス
   * @return {void}
   */
  static loadBinary(): void {
    console.log('temp');
  }

  /**
   * fSpyのjsonデータを読み込んだあとに実行される関数
   * @return {void}
   */
  onLoadJson(result: FSpyCameraJson): void {
    this.fSpyCameraData = result;

    if (this.fSpyCameraData != null) {
      this.cameraTransforms = this.fSpyCameraData.cameraTransform.rows;
    }
    this.fspyImageRatio = this.getFSpyImageRatio();
    this.setMatrix();
    this.createCamera();
    window.addEventListener('resize', this.onResize.bind(this));
    this.runCallback.bind(this)();
  }

  /**
   * fSpyのjsonデータを読み込んだあとに実行される関数
   * @return {void}
   */
  static onLoadBinary(): void {
    console.log('temp');
  }

  /**
   * マトリックスオブジェクトに数字をセットする
   * @return {THREE.Matrix4} パラメータがセットされたMatrix4を返す
   */

  setMatrix(): THREE.Matrix4 {
    /**
     * fSpyのカメラのtransformの配列データ
     * @type {Array}
     */
    const mtxArray = this.cameraTransforms;

    const preArray: number[] = [];

    /**
     * fSpyの多次元配列を一次元配列に変換
     * @type {Array}
     */

    const matrixArray = mtxArray.reduce((pre, curernt) => {
      pre.push(...curernt);
      return pre;
    }, preArray);
    this.rotationMatrix.elements = matrixArray;

    return this.rotationMatrix;
  }

  /**
   * windowのアスペクト比を取得する関数
   * @return {number}
   */
  static getWinRatio(): number {
    const w = window.innerWidth;
    const h = window.innerHeight;

    return w / h;
  }

  /**
   * fSpyのJSONから取得したもともとの画像のアスペクト比を返す
   * @return {number}
   */

  getFSpyImageRatio(): number {
    if (this.fSpyCameraData != null) {
      const w = this.fSpyCameraData.imageWidth;
      const h = this.fSpyCameraData.imageHeight;
      return w / h;
    }

    return 0;
  }

  static getVFovDegFromRad(radians: number): number {
    const rad = THREE.MathUtils.radToDeg(radians);

    return rad;
  }

  /**
   * three.jsのカメラを作成する関数
   * @return {void}
   */
  createCamera(): void {
    if (this.cameraTransforms != null && this.fSpyCameraData != null) {
      /**
       * fSpyのカメラのtransformの配列データ
       * @type {Array}
       */
      const mtxArray = this.cameraTransforms;

      this.cameraFov = FSpyCamera.getVFovDegFromRad(this.fSpyCameraData.verticalFieldOfView);
      this.camera.fov = this.cameraFov;
      this.camera.aspect = this.canvasWidth / this.canvasHeight;
      this.camera.near = 0.01;
      this.camera.far = 10000;
      this.camera.position.set(mtxArray[0][3], mtxArray[1][3], mtxArray[2][3]);
      this.camera.setRotationFromMatrix(this.rotationMatrix);
      this.initCameraAspect = this.getFSpyImageRatio();
      this.onResize();
    }
  }

  /**
   * リサイズした際に発火する関数
   * @return {void}
   */
  onResize(): void {
    this.targetCanvasRect = this.targetCanvas.getBoundingClientRect();
    this.canvasWidth = this.targetCanvasRect.width;
    this.canvasHeight = this.targetCanvas.height;
    const fSpyImageRatio = this.initCameraAspect;
    if (this.canvasWidth / this.canvasHeight <= fSpyImageRatio) {
      this.camera.aspect = this.canvasWidth / this.canvasHeight;
      this.camera.zoom = 1;
    } else {
      this.camera.aspect = this.canvasWidth / this.canvasHeight;
      this.camera.zoom = this.canvasWidth / this.canvasHeight / fSpyImageRatio;
    }
    this.camera.updateProjectionMatrix();
  }

  /**
   * コールバックを実行する関数
   * @return {void}
   */
  runCallback(): void {
    if (getType(this.callback) === 'function') {
      this.callback();
    }
  }
}
