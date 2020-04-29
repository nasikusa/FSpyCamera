import { MathUtils, Matrix4, PerspectiveCamera } from 'three';

function getBrowserName () {
    var browser = '';
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('msie') !== -1 || userAgent.indexOf('trident') !== -1) {
        browser = 'ie';
    }
    else if (userAgent.indexOf('edge') !== -1) {
        browser = 'edge';
    }
    else if (userAgent.indexOf('chrome') !== -1) {
        browser = 'chrome';
    }
    else if (userAgent.indexOf('safari') !== -1) {
        browser = 'safari';
    }
    else if (userAgent.indexOf('firefox') !== -1) {
        browser = 'firefox';
    }
    else if (userAgent.indexOf('opera') !== -1) {
        browser = 'opera';
    }
    else {
        browser = 'other';
    }
    return browser;
}

var AsyncFunctions = (function () {
    function AsyncFunctions() {
        this.xhr = new XMLHttpRequest();
    }
    AsyncFunctions.prototype.open = function (path, callback) {
        this.xhr.open('GET', path);
        this.xhr.responseType = 'json';
        this.xhr.addEventListener('load', function () {
            var browserName = getBrowserName();
            var result = browserName === 'ie' ? JSON.parse(this.response) : this.response;
            callback(result);
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
    function FSpyCamera(canvasElement, options) {
        if (options === void 0) { options = {}; }
        this.inputData = '';
        this.fspyImageRatio = 0;
        this.fSpyCameraData = null;
        this.rotationMatrix = new Matrix4();
        this.targetCanvas = canvasElement;
        this.targetCanvasRect = this.targetCanvas.getBoundingClientRect();
        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;
        this.winRatio = this.winWidth / this.winHeight;
        this.camera = new PerspectiveCamera();
        this.canvasWidth = this.targetCanvasRect.width;
        this.canvasHeight = this.targetCanvasRect.height;
        this.cameraTransforms = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        this.options = options;
        this.callback = function () { };
        this.jsonType = getType(this.inputData);
        this.initCameraAspect = 0;
        this.cameraFov = 0;
    }
    FSpyCamera.prototype.load = function (jsonPathOrjsonData, callback) {
        this.inputData = jsonPathOrjsonData;
        this.callback = callback;
        if (this.jsonType === 'string' && typeof this.inputData === 'string') {
            var ext = getExt(this.inputData);
            if (ext.toLowerCase() === 'json') {
                this.loadJson(this.inputData);
            }
            else if (ext.toLowerCase() === 'fspy') {
                FSpyCamera.loadBinary();
            }
        }
        else if (typeof this.inputData === 'object') {
            this.onLoadJson(this.inputData);
        }
        else {
            console.error("Please put fSpy's json path or parsed json in the first argument");
        }
    };
    FSpyCamera.prototype.loadJson = function (path) {
        var asyncFunctions = new AsyncFunctions();
        asyncFunctions.open(path, this.onLoadJson.bind(this));
    };
    FSpyCamera.loadBinary = function () {
        console.log('temp');
    };
    FSpyCamera.prototype.onLoadJson = function (result) {
        this.fSpyCameraData = result;
        if (this.fSpyCameraData != null) {
            this.cameraTransforms = this.fSpyCameraData.cameraTransform.rows;
        }
        this.fspyImageRatio = this.getFSpyImageRatio();
        this.setMatrix();
        this.createCamera();
        window.addEventListener('resize', this.onResize.bind(this));
        this.runCallback.bind(this)();
    };
    FSpyCamera.onLoadBinary = function () {
        console.log('temp');
    };
    FSpyCamera.prototype.setMatrix = function () {
        var mtxArray = this.cameraTransforms;
        var preArray = [];
        var matrixArray = mtxArray.reduce(function (pre, curernt) {
            pre.push.apply(pre, curernt);
            return pre;
        }, preArray);
        this.rotationMatrix.elements = matrixArray;
        return this.rotationMatrix;
    };
    FSpyCamera.getWinRatio = function () {
        var w = window.innerWidth;
        var h = window.innerHeight;
        return w / h;
    };
    FSpyCamera.prototype.getFSpyImageRatio = function () {
        if (this.fSpyCameraData != null) {
            var w = this.fSpyCameraData.imageWidth;
            var h = this.fSpyCameraData.imageHeight;
            return w / h;
        }
        return 0;
    };
    FSpyCamera.getVFovDegFromRad = function (radians) {
        var rad = MathUtils.radToDeg(radians);
        return rad;
    };
    FSpyCamera.prototype.createCamera = function () {
        if (this.cameraTransforms != null && this.fSpyCameraData != null) {
            var mtxArray = this.cameraTransforms;
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
    };
    FSpyCamera.prototype.onResize = function () {
        this.targetCanvasRect = this.targetCanvas.getBoundingClientRect();
        this.canvasWidth = this.targetCanvasRect.width;
        this.canvasHeight = this.targetCanvas.height;
        var fSpyImageRatio = this.initCameraAspect;
        if (this.canvasWidth / this.canvasHeight <= fSpyImageRatio) {
            this.camera.aspect = this.canvasWidth / this.canvasHeight;
            this.camera.zoom = 1;
        }
        else {
            this.camera.aspect = this.canvasWidth / this.canvasHeight;
            this.camera.zoom = this.canvasWidth / this.canvasHeight / fSpyImageRatio;
        }
        this.camera.updateProjectionMatrix();
    };
    FSpyCamera.prototype.runCallback = function () {
        if (getType(this.callback) === 'function') {
            this.callback();
        }
    };
    return FSpyCamera;
}());

export default FSpyCamera;
