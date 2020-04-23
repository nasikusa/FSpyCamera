/**
 * fSpyのjsonデータからthree.jsのカメラを作成するクラス 
 * 
 */
class FSpyCamera {
  constructor( jsonPathOrjsonData , canvas , callback = null , options = {} ) {

    console.dir(canvas);

    /**
     * 第一引数で取得したjson or jsonへのパス or jsonから生成したオブジェクトを格納する 
     * @param {string|object}
     */
    this.inputData = jsonPathOrjsonData;

    /**
     * fSpyから取得データのアスペクトを収納 
     * @type {number|null}
     */
    this.fspyRatio = null;

    /**
     * fSpyから取得したjsonオブジェクトを格納
     * @type {object|null}
     */
    this.cameraData = null;

    /**
     * 行列オブジェクト
     * @type {THREE.Matrix4}
     */
    this.matrix = new THREE.Matrix4();

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
     * @type {THREE.PerspectiveCamera|null}
     */
    this.camera = null;

    this.width = null;

    this.height = null;

    /**
     * fSpyから取得したデータのうちのcameraTransform.rowsが入ります
     * @type {array}
     */
    this.cameraTransforms = [];

    /**
     * カメラ取得後のコールバック関数
     * @type {object|null}
     */
    this.callback = callback || null;

    /**
     * 引数でもらった jsonPathOrjsonData の型を収納
     * @type {string}
     */
    this.jsonType = this._getType(this.inputData);

    /**
     * 初期状態のカメラのアスペクト比
     * @type {numer}
     */
    this.initCameraAspect = null;

    /**
     * カメラのFOVを格納する変数
     * @type {number}
     */
    this.fov = null;

    this.width = window.innerWidth;
    this.height = 500;

    this._init();

  }

  _init() {

    if( this.jsonType === "string" ){
      this._loadJson(this.inputData);
    }else if( this.jsonType === "object" ){
      this.cameraData = this.inputData;
      this._onLoadJson();
    }else {
      console.error("第一引数にfSpyのjsonのパスか、jsonをパースしたものを入れてください");
      return;
    }

  }

  /**
   * fSpyのjsonデータを取得する関数
   * @param {string} name カメラデータのパス
   * @return {void}
   */
  _loadJson(name) {
    axios.get(name).then( res => {
      this.cameraData = res.data;
      this._onLoadJson()
    })
  }


  /**
   * fSpyのjsonデータを読み込んだあとに実行される関数
   * @return {void}
   */
  _onLoadJson() {

    this.cameraTransforms = this.cameraData.cameraTransform.rows;
    this.fspyImageRatio = this._getFSpyImageRatio();
    this._setMatrix();
    this._createCamera();
    window.addEventListener('resize',this.onResize.bind(this));
    this._runCallback.bind(this)();

  }

  /**
   * マトリックスオブジェクトに数字をセットする 
   * @return {THREE.Matrix4} パラメータがセットされたMatrix4を返す
   */ 
  _setMatrix() {

    /**
     * fSpyのカメラのtransformの配列データ
     * @type {Array}
     */
    const mtxArray = this.cameraTransforms;
    /**
     * fSpyの多次元配列を一次元配列に変換 
     * @type {Array}
     */ 
    const matrixArray = mtxArray.reduce((pre,curernt) => {
      pre.push(...curernt);
      return pre;
    },[]);
    this.matrix.set(...matrixArray);

    return this.matrix;

  }

  /**
   * windowのアスペクト比を取得する関数 
   * @return {number}
   */
  _getWinRatio() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    return w / h;
  }

  /**
   * fSpyのJSONから取得したもともとの画像のアスペクト比を返す
   * @return {number}
   */ 
  _getFSpyImageRatio() {

    const w = this.cameraData.imageWidth;
    const h = this.cameraData.imageHeight;

    return w / h;

  }

  _getVFovDegFromRad( radians ) {

    const rad = THREE.Math.radToDeg( radians );

    return rad;

  }

  /**
   * three.jsのカメラを作成する関数
   * @return {void}
   */
  _createCamera() {

    /**
     * fSpyのカメラのtransformの配列データ
     * @type {Array}
     */
      const mtxArray = this.cameraTransforms;

      this.fov = this._getVFovDegFromRad( this.cameraData.verticalFieldOfView );

    this.camera = new THREE.PerspectiveCamera( this.fov , this.width / this.height , 0.01 , 10000 );
    // this.camera = new THREE.PerspectiveCamera(35, this.winWidth / this.winHeight , 0.01 , 10000 );
    this.camera.position.set( mtxArray[0][3] , mtxArray[1][3] , mtxArray[2][3] );
    this.camera.setRotationFromMatrix( this.matrix );
    this.initCameraAspect = this.camera.aspect;
    
  }

  /**
   * リサイズした際に発火する関数
   * @return {void}
   */
  onResize() {

    // this.width = window.innerWidth;
    // this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.height = 500
    // if( this.width / this.height <= this.initCameraAspect  ){
    if( this.width / this.height <= this._getFSpyImageRatio()  ){
        this.camera.aspect = this.width /  this.height;
        this.camera.zoom = 1;
    }else{
        this.camera.aspect = this.width /  this.height;
        // this.camera.zoom = this.width /  this.height / this.initCameraAspect;
        this.camera.zoom = this.width /  this.height / this._getFSpyImageRatio();
        console.log(this.camera.zoom);
    }
    // this.renderer.render( scene , camera );
    this.camera.updateProjectionMatrix();
  }

  /**
   * コールバックを実行する関数 
   * @return {void}
   */
  _runCallback() {

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
  _getType(obj) {

    const toString = Object.prototype.toString;
    return toString.call(obj).slice(8, -1).toLowerCase();

  }

}
