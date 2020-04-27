import { MathUtils, Matrix4, PerspectiveCamera } from 'three';

var AsyncFunctions = (function () {
    function AsyncFunctions() {
        this.xhr = new XMLHttpRequest();
        this.xhr.responseType = 'json';
    }
    AsyncFunctions.prototype.open = function (path, callback) {
        this.xhr.open("GET", path);
        this.xhr.addEventListener('load', function (result) {
            console.log(result);
            callback();
        });
        this.xhr.send();
    };
    return AsyncFunctions;
}());

function getType(object) {
    var toString = Object.prototype.toString;
    return toString.call(object).slice(8, -1).toLowerCase();
}

function getExt(filename) {
    var dotPosition = filename.lastIndexOf('.');
    if (dotPosition === -1)
        return '';
    return filename.slice(dotPosition + 1);
}

var FSpyCamera = (function () {
    function FSpyCamera(jsonPathOrjsonData, canvasElement, callback, options) {
        if (options === void 0) { options = {}; }
        this.inputData = jsonPathOrjsonData;
        this.fspyImageRatio = 0;
        this.fSpyCameraData = null;
        this.rotationMatrix = new Matrix4();
        this.canvas = canvasElement;
        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;
        this.winRatio = this.winWidth / this.winHeight;
        this.camera = new PerspectiveCamera();
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.cameraTransforms = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.options = options;
        this.callback = callback;
        this.jsonType = getType(this.inputData);
        this.initCameraAspect = 0;
        this.cameraFov = 0;
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = 500;
    }
    FSpyCamera.prototype.load = function () {
        if (this.jsonType === "string" && typeof this.inputData === "string") {
            var ext = getExt(this.inputData);
            if (ext.toLowerCase() === "json") {
                this._loadJson(this.inputData);
            }
            else if (ext.toLowerCase() === 'fspy') {
                this._loadBinary();
            }
        }
        else if (this.jsonType === "object" && typeof this.inputData === "object") {
            this.fSpyCameraData = this.inputData;
            this._onLoadJson();
        }
        else {
            console.error("Please put fSpy's json path or parsed json in the first argument");
        }
    };
    FSpyCamera.prototype._getEXT = function (filename) {
        var dotPosition = filename.lastIndexOf('.');
        if (dotPosition === -1)
            return '';
        return filename.slice(dotPosition + 1);
    };
    FSpyCamera.prototype._loadJson = function (path) {
        console.log(path);
        var asyncFunctions = new AsyncFunctions();
        asyncFunctions.open(path, this._onLoadJson);
    };
    FSpyCamera.prototype._loadBinary = function () {
    };
    FSpyCamera.prototype._onLoadJson = function () {
        if (this.fSpyCameraData != null) {
            this.cameraTransforms = this.fSpyCameraData.cameraTransform.rows;
        }
        this.fspyImageRatio = this._getFSpyImageRatio();
        this._setMatrix();
        this._createCamera();
        window.addEventListener('resize', this.onResize.bind(this));
        this._runCallback.bind(this)();
    };
    FSpyCamera.prototype._onLoadBinary = function () {
    };
    FSpyCamera.prototype._setMatrix = function () {
        var mtxArray = this.cameraTransforms;
        var preArray = [];
        var matrixArray = mtxArray.reduce(function (pre, curernt) {
            pre.push.apply(pre, curernt);
            return pre;
        }, preArray);
        this.rotationMatrix.elements = matrixArray;
        return this.rotationMatrix;
    };
    FSpyCamera.prototype._getWinRatio = function () {
        var w = window.innerWidth;
        var h = window.innerHeight;
        return w / h;
    };
    FSpyCamera.prototype._getFSpyImageRatio = function () {
        if (this.fSpyCameraData != null) {
            var w = this.fSpyCameraData.imageWidth;
            var h = this.fSpyCameraData.imageHeight;
            return w / h;
        }
        return 0;
    };
    FSpyCamera.prototype._getVFovDegFromRad = function (radians) {
        var rad = MathUtils.radToDeg(radians);
        return rad;
    };
    FSpyCamera.prototype._createCamera = function () {
        if (this.cameraTransforms != null && this.fSpyCameraData != null) {
            var mtxArray = this.cameraTransforms;
            this.cameraFov = this._getVFovDegFromRad(this.fSpyCameraData.verticalFieldOfView);
            this.camera.fov = this.cameraFov;
            this.camera.aspect = this.canvasWidth / this.canvasHeight;
            this.camera.near = 0.01;
            this.camera.far = 10000;
            this.camera.position.set(mtxArray[0][3], mtxArray[1][3], mtxArray[2][3]);
            this.camera.setRotationFromMatrix(this.rotationMatrix);
            this.initCameraAspect = this.camera.aspect;
        }
    };
    FSpyCamera.prototype.onResize = function () {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = 500;
        if (this.canvasWidth / this.canvasHeight <= this._getFSpyImageRatio()) {
            this.camera.aspect = this.canvasWidth / this.canvasHeight;
            this.camera.zoom = 1;
        }
        else {
            this.camera.aspect = this.canvasWidth / this.canvasHeight;
            this.camera.zoom = this.canvasWidth / this.canvasHeight / this._getFSpyImageRatio();
            console.log(this.camera.zoom);
        }
        this.camera.updateProjectionMatrix();
    };
    FSpyCamera.prototype._runCallback = function () {
        if (this._getType(this.callback) === "function") {
            this.callback(this);
        }
    };
    FSpyCamera.prototype._getType = function (obj) {
        var toString = Object.prototype.toString;
        return toString.call(obj).slice(8, -1).toLowerCase();
    };
    return FSpyCamera;
}());

export default FSpyCamera;
