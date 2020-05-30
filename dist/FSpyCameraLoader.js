/*!
 * three-fspy-camera-loader
 * https://github.com/nasikusa/three-fspy-camera-loader
 * (c) 2020 @nasikusa
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
	typeof define === 'function' && define.amd ? define(['three'], factory) :
	(global = global || self, global.FSpyCameraLoader = factory(global.THREE));
}(this, (function (three) { 'use strict';

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var defaultCameraParams = {
	    aspect: 1,
	    far: 2000,
	    filmGauge: 35,
	    filmOffset: 0,
	    fov: 50,
	    near: 0.1,
	    zoom: 1,
	};

	var FSpyDataManager = (function () {
	    function FSpyDataManager() {
	        this.rawData = null;
	        this.data = null;
	        this.internalImageRatio = defaultCameraParams.aspect;
	        this.internalCameraFov = defaultCameraParams.fov;
	        this.internalOriginalImageSize = new three.Vector2();
	        this.internalCameraTransformMatrix = new three.Matrix4();
	        this.internalViewTransformMatrix = new three.Matrix4();
	        this.internalCameraPosition = new three.Vector3();
	        this.internalIsSetData = false;
	    }
	    FSpyDataManager.prototype.setData = function (rawData) {
	        this.internalIsSetData = true;
	        this.rawData = rawData;
	        this.onSetData();
	    };
	    FSpyDataManager.prototype.removeData = function () {
	        this.internalIsSetData = false;
	        this.rawData = null;
	        this.onRemoveData();
	    };
	    FSpyDataManager.prototype.getData = function () {
	        return this.rawData;
	    };
	    FSpyDataManager.prototype.getComputedData = function () {
	        return this.data;
	    };
	    FSpyDataManager.prototype.setComputedData = function () {
	        if (this.rawData != null) {
	            this.data = {};
	            this.data.principalPoint = new three.Vector2(this.rawData.principalPoint.x, this.rawData.principalPoint.y);
	            this.data.viewTransform = this.internalViewTransformMatrix;
	            this.data.cameraTransform = this.internalCameraTransformMatrix;
	            this.data.horizontalFieldOfView = this.rawData.horizontalFieldOfView;
	            this.data.verticalFieldOfView = this.rawData.verticalFieldOfView;
	            this.data.vanishingPoints = [
	                new three.Vector2(this.rawData.vanishingPoints[0].x, this.rawData.vanishingPoints[0].y),
	                new three.Vector2(this.rawData.vanishingPoints[1].x, this.rawData.vanishingPoints[1].y),
	                new three.Vector2(this.rawData.vanishingPoints[2].x, this.rawData.vanishingPoints[2].y),
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
	    };
	    FSpyDataManager.prototype.onSetData = function () {
	        this.internalImageRatio = this.calcImageRatio();
	        if (this.rawData != null) {
	            this.internalOriginalImageSize = new three.Vector2(this.rawData.imageWidth, this.rawData.imageHeight);
	            this.internalCameraFov = FSpyDataManager.getVFovDegFromRad(this.rawData.verticalFieldOfView);
	            this.setTransformMatrix(this.rawData.cameraTransform.rows, this.internalCameraTransformMatrix);
	            this.setTransformMatrix(this.rawData.viewTransform.rows, this.internalViewTransformMatrix);
	            this.setCameraPosition(this.internalCameraTransformMatrix);
	            this.setComputedData();
	        }
	    };
	    FSpyDataManager.prototype.onRemoveData = function () {
	        this.internalImageRatio = defaultCameraParams.aspect;
	        this.internalCameraFov = defaultCameraParams.fov;
	        this.internalOriginalImageSize = new three.Vector2();
	        this.internalCameraTransformMatrix = new three.Matrix4();
	        this.internalViewTransformMatrix = new three.Matrix4();
	        this.internalCameraPosition = new three.Vector3();
	        this.data = null;
	    };
	    FSpyDataManager.prototype.calcImageRatio = function () {
	        if (this.rawData != null) {
	            var w = this.rawData.imageWidth;
	            var h = this.rawData.imageHeight;
	            return w / h;
	        }
	        return defaultCameraParams.aspect;
	    };
	    FSpyDataManager.getVFovDegFromRad = function (radians) {
	        return three.MathUtils.radToDeg(radians);
	    };
	    FSpyDataManager.prototype.setTransformMatrix = function (transformArray, matrix) {
	        if (this.rawData != null) {
	            var matrixData = matrix;
	            var mtxArray = transformArray;
	            var preArray = [];
	            var matrixArray = mtxArray.reduce(function (pre, curernt) {
	                pre.push.apply(pre, curernt);
	                return pre;
	            }, preArray);
	            matrixData.set(matrixArray[0], matrixArray[1], matrixArray[2], matrixArray[3], matrixArray[4], matrixArray[5], matrixArray[6], matrixArray[7], matrixArray[8], matrixArray[9], matrixArray[10], matrixArray[11], matrixArray[12], matrixArray[13], matrixArray[14], matrixArray[15]);
	            return matrixData;
	        }
	        return new three.Matrix4();
	    };
	    FSpyDataManager.prototype.setCameraPosition = function (cameraMatrix) {
	        if (this.rawData != null) {
	            var matrixElements = cameraMatrix.elements;
	            this.internalCameraPosition = new three.Vector3(matrixElements[12], matrixElements[13], matrixElements[14]);
	        }
	        return this.internalCameraPosition;
	    };
	    Object.defineProperty(FSpyDataManager.prototype, "imageRatio", {
	        get: function () {
	            return this.internalImageRatio;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "cameraMatrix", {
	        get: function () {
	            return this.internalCameraTransformMatrix;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "viewMatrix", {
	        get: function () {
	            return this.internalViewTransformMatrix;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "cameraFov", {
	        get: function () {
	            return this.internalCameraFov;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "cameraPosition", {
	        get: function () {
	            return this.internalCameraPosition;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "isSetData", {
	        get: function () {
	            return this.internalIsSetData;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "imageSize", {
	        get: function () {
	            return this.internalOriginalImageSize;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "imageWidth", {
	        get: function () {
	            return this.internalOriginalImageSize.width;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "imageHeight", {
	        get: function () {
	            return this.internalOriginalImageSize.height;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return FSpyDataManager;
	}());

	var AsyncFunction = (function () {
	    function AsyncFunction() {
	        this.xhr = new XMLHttpRequest();
	    }
	    AsyncFunction.prototype.load = function (path, onLoad) {
	        this.xhr.open('GET', path);
	        this.xhr.responseType = 'json';
	        this.xhr.addEventListener('load', function () {
	            var result = JSON.parse(this.response);
	            onLoad(result);
	        });
	        this.xhr.send();
	    };
	    return AsyncFunction;
	}());

	var FSpyCamerLoader = (function (_super) {
	    __extends(FSpyCamerLoader, _super);
	    function FSpyCamerLoader(manager) {
	        var _this = _super.call(this) || this;
	        three.Loader.call(_this, manager);
	        _this.isIE = FSpyCamerLoader.getIsUseIE();
	        _this.targetCanvas = null;
	        _this.targetCanvasSize = new three.Vector2();
	        _this.camera = new three.PerspectiveCamera();
	        _this.dataManager = new FSpyDataManager();
	        _this.internalIsEnableResizeEvent = false;
	        return _this;
	    }
	    Object.defineProperty(FSpyCamerLoader.prototype, "isEnableResizeEvent", {
	        get: function () {
	            return this.internalIsEnableResizeEvent;
	        },
	        set: function (resizeEventBoolean) {
	            if (this.internalIsEnableResizeEvent !== resizeEventBoolean) {
	                this.internalIsEnableResizeEvent = resizeEventBoolean;
	                if (this.internalIsEnableResizeEvent) {
	                    window.addEventListener('resize', this.onResize.bind(this));
	                }
	                else {
	                    window.removeEventListener('resize', this.onResize.bind(this));
	                }
	            }
	        },
	        enumerable: false,
	        configurable: true
	    });
	    FSpyCamerLoader.prototype.load = function (url, onLoad, onProgress, onError) {
	        var _this = this;
	        if (this.isIE) {
	            var loader = new AsyncFunction();
	            loader.load(url, function (resultJson) {
	                if (onLoad != null) {
	                    onLoad(_this.parse(resultJson));
	                }
	            });
	        }
	        else {
	            var loader = new three.FileLoader(this.manager);
	            loader.setPath(this.path);
	            loader.setResponseType('json');
	            loader.load(url, function (resultJson) {
	                if (onLoad != null) {
	                    onLoad(_this.parse(resultJson));
	                }
	            }, onProgress, onError);
	        }
	    };
	    FSpyCamerLoader.prototype.parse = function (fSpyJson) {
	        this.dataManager.setData(fSpyJson);
	        return this.createCamera();
	    };
	    FSpyCamerLoader.prototype.setCanvas = function (canvas) {
	        this.targetCanvas = canvas;
	    };
	    FSpyCamerLoader.prototype.removeCanvas = function () {
	        this.targetCanvas = null;
	    };
	    FSpyCamerLoader.prototype.setResizeUpdate = function () {
	        this.isEnableResizeEvent = true;
	    };
	    FSpyCamerLoader.prototype.removeResizeupdate = function () {
	        this.isEnableResizeEvent = false;
	    };
	    FSpyCamerLoader.prototype.createCamera = function () {
	        if (this.dataManager.isSetData) {
	            this.camera.fov = this.dataManager.cameraFov;
	            if (this.targetCanvasSize != null) {
	                this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
	            }
	            else {
	                this.camera.aspect = this.dataManager.imageRatio;
	            }
	            this.camera.position.set(this.dataManager.cameraPosition.x, this.dataManager.cameraPosition.y, this.dataManager.cameraPosition.z);
	            this.camera.setRotationFromMatrix(this.dataManager.cameraMatrix);
	            this.onResize();
	        }
	        return this.camera;
	    };
	    FSpyCamerLoader.getIsUseIE = function () {
	        var ua = window.navigator.userAgent.toLowerCase();
	        if (ua.indexOf('trident') >= 0) {
	            return true;
	        }
	        return false;
	    };
	    FSpyCamerLoader.prototype.onResize = function () {
	        if (this.targetCanvas != null) {
	            var rect = this.targetCanvas.getBoundingClientRect();
	            var fSpyImageRatio = this.dataManager.imageRatio;
	            this.targetCanvasSize.setX(rect.width);
	            this.targetCanvasSize.setY(rect.height);
	            if (this.targetCanvasSize.x / this.targetCanvasSize.y <= fSpyImageRatio) {
	                this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
	                this.camera.zoom = defaultCameraParams.zoom;
	            }
	            else {
	                this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
	                this.camera.zoom = this.targetCanvasSize.x / this.targetCanvasSize.y / fSpyImageRatio;
	            }
	            this.camera.updateProjectionMatrix();
	        }
	    };
	    FSpyCamerLoader.prototype.getData = function () {
	        return this.dataManager.getData();
	    };
	    FSpyCamerLoader.prototype.getComputedData = function () {
	        return this.dataManager.getComputedData();
	    };
	    return FSpyCamerLoader;
	}(three.Loader));

	return FSpyCamerLoader;

})));
