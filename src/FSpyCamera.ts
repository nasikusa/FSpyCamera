import * as THREE from "three";
import axios from 'axios';

import {
  FSpyCameraJson, FourElemArray,
} from './type';

import { getType } from './utils/getType';
import { getExt } from './utils/getExt';

export class FSpyCamera{

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

  protected winWidth: number;
  protected winHeight: number;
  protected winRatio: number;
  protected rotationMatrix: THREE.Matrix4;
  public camera: THREE.PerspectiveCamera;
  protected canvasWidth: number;
  protected canvasHeight: number;
  public callback: ( thisObject : this ) => any;
  protected cameraFov: number;
  public options: object;
  public targetCanvas : any;
  protected cameraTransforms: [FourElemArray<number>,FourElemArray<number>,FourElemArray<number>,FourElemArray<number>];
  public canvas: any;
  protected jsonType: string;
  protected initCameraAspect: number;
  

  constructor( jsonPathOrjsonData: string | FSpyCameraJson , canvasElement: any , callback : ( thisObject : object ) => any , options: object = {} ) {


    this.inputData = jsonPathOrjsonData;
    this.fspyImageRatio = 0;
    this.fSpyCameraData = null;

    /**
     * 行列オブジェクト
     * @type {THREE.Matrix4}
     */
    this.rotationMatrix = new THREE.Matrix4();

    this.canvas = canvasElement;

    /**
     * ウィンドウの幅
     * @type {number}
     */
    this.winWidth = window.innerWidth;

    /**
     * ウィンドウの高さ 
     * @type {number}
     */
    this.winHeight = window.innerHeight;

    /**
     * windowの幅と高さの比率をここに収納 
     * @type {number}
     */
      this.winRatio = this.winWidth / this.winHeight;

    /**
     * three.jsのカメラ
     * @type {THREE.PerspectiveCamera}
     */
    this.camera = new THREE.PerspectiveCamera();

    this.canvasWidth = 0;

    this.canvasHeight = 0;

    /**
     * fSpyから取得したデータのうちのcameraTransform.rowsが入ります
     */
    this.cameraTransforms = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];

    this.options = options;

    /**
     * カメラ取得後のコールバック関数
     * @type {object|null}
     */
    this.callback = callback;

    /**
     * 引数でもらった jsonPathOrjsonData の型を収納
     * @type {string}
     */
    this.jsonType = getType(this.inputData);

    /**
     * 初期状態のカメラのアスペクト比
     * @type {numer}
     */
    this.initCameraAspect = 0;

    /**
     * カメラのFOVを格納する変数
     * @type {number}
     */
    this.cameraFov = 0;

    this.canvasWidth = window.innerWidth;
    this.canvasHeight = 500;

  }

  load(): void {

    if( this.jsonType === "string" && typeof this.inputData === "string" ){
      const ext = getExt( this.inputData );
      if( ext.toLowerCase() === "json" ){
        this._loadJson(this.inputData);
      }else if( ext.toLowerCase() === 'fspy' ){
        this._loadBinary();
      }
    }else if( this.jsonType === "object" && typeof this.inputData === "object" ){
      this.fSpyCameraData = this.inputData;
      this._onLoadJson();
    }else {
      console.error("Please put fSpy's json path or parsed json in the first argument");
    }

  }

  _getEXT( filename: string ): string {

      const dotPosition = filename.lastIndexOf('.');
      if (dotPosition === -1) return '';
      return filename.slice( dotPosition + 1);

  }

  /**
   * fSpyのjsonデータを取得する関数
   * @param {string} name カメラデータのパス
   * @return {void}
   */
  _loadJson( name: string ): void {
    axios.get(name).then( (res: any) => {
      this.fSpyCameraData = res.data;
      this._onLoadJson()
    })
  }

  /**
   * fSpyのbinaryデータを取得する関数
   * @param {string} name カメラデータのパス
   * @return {void}
   */
  _loadBinary(): void {
    // axios.get(name, {
    //   responseType:'blob',
    //   dataType:'binary',
    // }).then( res => {
    //   console.log(res.data);
    //   this.fSpyCameraData = new Blob([res.data]);
    //   console.log(this.fSpyCameraData);
    //   this._onLoadBinary()
    // })
  }


  /**
   * fSpyのjsonデータを読み込んだあとに実行される関数
   * @return {void}
   */
  _onLoadJson(): void {

    if( this.fSpyCameraData != null ){
      this.cameraTransforms = this.fSpyCameraData.cameraTransform.rows;
    }
    this.fspyImageRatio = this._getFSpyImageRatio();
    this._setMatrix();
    this._createCamera();
    window.addEventListener('resize',this.onResize.bind(this));
    this._runCallback.bind(this)();

  }

  /**
   * fSpyのjsonデータを読み込んだあとに実行される関数
   * @return {void}
   */
  _onLoadBinary(): void {

    // this.cameraTransforms = this.fSpyCameraData.cameraTransform.rows;
    // this.fspyImageRatio = this._getFSpyImageRatio();
    // this._setMatrix();
    // this._createCamera();
    // window.addEventListener('resize',this.onResize.bind(this));
    // this._runCallback.bind(this)();

  }

  /**
   * マトリックスオブジェクトに数字をセットする 
   * @return {THREE.Matrix4} パラメータがセットされたMatrix4を返す
   */ 
  _setMatrix(): THREE.Matrix4 {

    /**
     * fSpyのカメラのtransformの配列データ
     * @type {Array}
     */
    const mtxArray = this.cameraTransforms;

    const preArray : number[] = [];

    /**
     * fSpyの多次元配列を一次元配列に変換 
     * @type {Array}
     */ 
    const matrixArray = mtxArray.reduce((pre,curernt) => {
      pre.push(...curernt);
      return pre;
    },preArray);
    this.rotationMatrix.elements = matrixArray;

    return this.rotationMatrix;

  }

  /**
   * windowのアスペクト比を取得する関数 
   * @return {number}
   */
  _getWinRatio(): number {
    const w = window.innerWidth;
    const h = window.innerHeight;

    return w / h;
  }

  /**
   * fSpyのJSONから取得したもともとの画像のアスペクト比を返す
   * @return {number}
   */ 
  _getFSpyImageRatio(): number {

    if( this.fSpyCameraData != null ){

      const w = this.fSpyCameraData.imageWidth;
      const h = this.fSpyCameraData.imageHeight;
      return w / h;

    }

    return 0;

  }

  _getVFovDegFromRad( radians: number ): number {

    const rad = THREE.MathUtils.radToDeg( radians );

    return rad;

  }

  /**
   * three.jsのカメラを作成する関数
   * @return {void}
   */
  _createCamera(): void {

    if( this.cameraTransforms != null && this.fSpyCameraData != null ){
      
      /**
       * fSpyのカメラのtransformの配列データ
       * @type {Array}
       */
      const mtxArray = this.cameraTransforms;
  
      this.cameraFov = this._getVFovDegFromRad( this.fSpyCameraData.verticalFieldOfView );
  
      // this.camera = new THREE.PerspectiveCamera( this.cameraFov , this.canvasWidth / this.canvasHeight , 0.01 , 10000 );

      this.camera.fov = this.cameraFov;
      this.camera.aspect = this.canvasWidth / this.canvasHeight;
      this.camera.near = 0.01;
      this.camera.far = 10000;
      this.camera.position.set( mtxArray[0][3] , mtxArray[1][3] , mtxArray[2][3] );
      this.camera.setRotationFromMatrix( this.rotationMatrix );
      this.initCameraAspect = this.camera.aspect;

    }
    
  }

  /**
   * リサイズした際に発火する関数
   * @return {void}
   */
  onResize(): void {

    // this.canvasWidth = window.innerWidth;
    // this.canvasHeight = window.innerHeight;
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = 500
    // if( this.canvasWidth / this.canvasHeight <= this.initCameraAspect  ){
    if( this.canvasWidth / this.canvasHeight <= this._getFSpyImageRatio()  ){
        this.camera.aspect = this.canvasWidth /  this.canvasHeight;
        this.camera.zoom = 1;
    }else{
        this.camera.aspect = this.canvasWidth /  this.canvasHeight;
        // this.camera.zoom = this.canvasWidth /  this.canvasHeight / this.initCameraAspect;
        this.camera.zoom = this.canvasWidth /  this.canvasHeight / this._getFSpyImageRatio();
        console.log(this.camera.zoom);
    }
    this.camera.updateProjectionMatrix();
  }

  /**
   * コールバックを実行する関数 
   * @return {void}
   */
  _runCallback(): void {

    if( this._getType( this.callback ) === "function" ){
      this.callback(this);
    }

  }

  /**
   * 型情報を取得すための関数
   * @param {any} 型を調べたいもの
   * @return {string} 型情報
   * 
   */
  _getType(obj: any): string {

    const toString = Object.prototype.toString;
    return toString.call(obj).slice(8, -1).toLowerCase();

  }

}
