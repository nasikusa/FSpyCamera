(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
	typeof define === 'function' && define.amd ? define(['three'], factory) :
	(global = global || self, global.FSpyCameraLoader = factory(global.THREE));
}(this, (function (three) { 'use strict';

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
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

	var FSpyDataManager = (function () {
	    function FSpyDataManager() {
	        this.data = null;
	        this.internalImageRatio = 0;
	        this.internalCameraFov = 0;
	        this.radian = 0;
	        this.internalRotationMatrix = new three.Matrix4();
	        this.internalCameraPosition = new three.Vector3(0.0);
	        this.internalIsSetData = false;
	    }
	    FSpyDataManager.prototype.setData = function (data) {
	        this.internalIsSetData = true;
	        this.data = data;
	        this.onSetData();
	    };
	    FSpyDataManager.prototype.removeData = function () {
	        this.internalIsSetData = false;
	        this.data = null;
	        this.onRemoveData();
	    };
	    FSpyDataManager.prototype.getData = function () {
	        return this.data;
	    };
	    FSpyDataManager.prototype.onSetData = function () {
	        this.internalImageRatio = this.calcImageRatio();
	        if (this.data != null) {
	            this.internalCameraFov = this.getVFovDegFromRad(this.data.verticalFieldOfView);
	            this.setMatrix();
	            this.setCameraPosition();
	        }
	    };
	    FSpyDataManager.prototype.onRemoveData = function () {
	        this.internalImageRatio = 0;
	        this.internalCameraFov = 0;
	        this.internalRotationMatrix = new three.Matrix4();
	        this.internalCameraPosition = new three.Vector3(0.0);
	    };
	    FSpyDataManager.prototype.calcImageRatio = function () {
	        if (this.data != null) {
	            var w = this.data.imageWidth;
	            var h = this.data.imageHeight;
	            return w / h;
	        }
	        return 0;
	    };
	    FSpyDataManager.prototype.getVFovDegFromRad = function (radians) {
	        this.radian = three.MathUtils.radToDeg(radians);
	        return this.radian;
	    };
	    FSpyDataManager.prototype.setMatrix = function () {
	        if (this.data != null) {
	            var mtxArray = this.data.cameraTransform.rows;
	            var preArray = [];
	            var matrixArray = mtxArray.reduce(function (pre, curernt) {
	                pre.push.apply(pre, curernt);
	                return pre;
	            }, preArray);
	            this.internalRotationMatrix.elements = matrixArray;
	            return this.internalRotationMatrix;
	        }
	        return new three.Matrix4();
	    };
	    FSpyDataManager.prototype.setCameraPosition = function () {
	        if (this.data != null) {
	            var mtxArray = this.data.cameraTransform.rows;
	            this.internalCameraPosition = new three.Vector3(mtxArray[0][3], mtxArray[1][3], mtxArray[2][3]);
	        }
	    };
	    Object.defineProperty(FSpyDataManager.prototype, "imageRatio", {
	        get: function () {
	            return this.internalImageRatio;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "rotationMatrix", {
	        get: function () {
	            return this.internalRotationMatrix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "cameraFov", {
	        get: function () {
	            return this.internalCameraFov;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "cameraPosition", {
	        get: function () {
	            return this.internalCameraPosition;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "isSetData", {
	        get: function () {
	            return this.internalIsSetData;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return FSpyDataManager;
	}());

	var FSpyCamerLoader = (function (_super) {
	    __extends(FSpyCamerLoader, _super);
	    function FSpyCamerLoader(manager) {
	        var _this = _super.call(this) || this;
	        three.Loader.call(_this, manager);
	        _this.targetCanvas = null;
	        _this.targetCanvasRect = null;
	        _this.targetCanvasSize = new three.Vector2();
	        _this.camera = new three.PerspectiveCamera();
	        _this.dataManager = new FSpyDataManager();
	        return _this;
	    }
	    FSpyCamerLoader.prototype.load = function (url, onLoad, onProgress, onError) {
	        var scope = this;
	        var loader = new three.FileLoader(this.manager);
	        loader.setPath(this.path);
	        loader.setResponseType('json');
	        loader.load(url, function (text) {
	            onLoad(scope.parse(text));
	        }, onProgress, onError);
	    };
	    FSpyCamerLoader.prototype.parse = function (text) {
	        if ('object' === typeof text) {
	            this.dataManager.setData(text);
	            this.createCamera();
	        }
	    };
	    FSpyCamerLoader.prototype.setCanvas = function (canvas) {
	        this.targetCanvas = canvas;
	    };
	    FSpyCamerLoader.prototype.removeCanvas = function () {
	        this.targetCanvas = null;
	    };
	    FSpyCamerLoader.prototype.setResizeUpdate = function (canvas) {
	        if (canvas) {
	            this.setCanvas(canvas);
	        }
	        window.addEventListener('resize', this.onResize.bind(this));
	    };
	    FSpyCamerLoader.prototype.removeResizeupdate = function (canvas) {
	        if (canvas) {
	            this.removeCanvas();
	        }
	        window.removeEventListener('resize', this.onResize.bind(this));
	    };
	    FSpyCamerLoader.prototype.createCamera = function () {
	        if (this.dataManager.isSetData) {
	            this.camera.fov = this.dataManager.cameraFov;
	            if (this.targetCanvasSize != null) {
	                this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
	            }
	            else {
	                this.camera.aspect = 0;
	            }
	            this.camera.position.set(this.dataManager.cameraPosition.x, this.dataManager.cameraPosition.y, this.dataManager.cameraPosition.z);
	            this.camera.setRotationFromMatrix(this.dataManager.rotationMatrix);
	            this.onResize();
	        }
	    };
	    FSpyCamerLoader.prototype.onResize = function () {
	        if (this.targetCanvas != null) {
	            this.targetCanvasRect = this.targetCanvas.getBoundingClientRect();
	            this.targetCanvasSize.setX(this.targetCanvasRect.width);
	            this.targetCanvasSize.setY(this.targetCanvasRect.height);
	            var fSpyImageRatio = this.dataManager.imageRatio;
	            if (this.targetCanvasSize.x / this.targetCanvasSize.y <= fSpyImageRatio) {
	                this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
	                this.camera.zoom = 1;
	            }
	            else {
	                this.camera.aspect = this.targetCanvasSize.x / this.targetCanvasSize.y;
	                this.camera.zoom = this.targetCanvasSize.x / this.targetCanvasSize.y / fSpyImageRatio;
	            }
	            this.camera.updateProjectionMatrix();
	        }
	    };
	    return FSpyCamerLoader;
	}(three.Loader));

	return FSpyCamerLoader;

})));
