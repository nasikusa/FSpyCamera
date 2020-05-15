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
	    };
	    FSpyDataManager.prototype.onSetData = function () {
	        this.internalImageRatio = this.calcImageRatio();
	        if (this.rawData != null) {
	            this.internalOriginalImageSize = new three.Vector2(this.rawData.imageWidth, this.rawData.imageHeight);
	            this.internalCameraFov = this.getVFovDegFromRad(this.rawData.verticalFieldOfView);
	            this.setTransformMatrix(this.rawData.cameraTransform.rows, this.internalCameraTransformMatrix);
	            this.setTransformMatrix(this.rawData.viewTransform.rows, this.internalViewTransformMatrix);
	            this.setCameraPosition();
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
	    FSpyDataManager.prototype.getVFovDegFromRad = function (radians) {
	        var radian = three.MathUtils.radToDeg(radians);
	        return radian;
	    };
	    FSpyDataManager.prototype.setTransformMatrix = function (transformArray, matrix) {
	        if (this.rawData != null) {
	            var mtxArray = transformArray;
	            var preArray = [];
	            var matrixArray = mtxArray.reduce(function (pre, curernt) {
	                pre.push.apply(pre, curernt);
	                return pre;
	            }, preArray);
	            matrix.elements = matrixArray;
	            return matrix;
	        }
	        return new three.Matrix4();
	    };
	    FSpyDataManager.prototype.setCameraPosition = function () {
	        if (this.rawData != null) {
	            var mtxArray = this.rawData.cameraTransform.rows;
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
	            return this.cameraMatrix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "cameraMatrix", {
	        get: function () {
	            return this.internalCameraTransformMatrix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "viewMatrix", {
	        get: function () {
	            return this.internalViewTransformMatrix;
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
	    Object.defineProperty(FSpyDataManager.prototype, "imageSize", {
	        get: function () {
	            return this.internalOriginalImageSize;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "imageWidth", {
	        get: function () {
	            return this.internalOriginalImageSize.width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FSpyDataManager.prototype, "imageHeight", {
	        get: function () {
	            return this.internalOriginalImageSize.height;
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
	        _this.targetCanvasSize = new three.Vector2();
	        _this.camera = new three.PerspectiveCamera();
	        _this.dataManager = new FSpyDataManager();
	        return _this;
	    }
	    FSpyCamerLoader.prototype.load = function (url, onLoad, onProgress, onError) {
	        var _this = this;
	        var loader = new three.FileLoader(this.manager);
	        loader.setPath(this.path);
	        loader.setResponseType('json');
	        loader.load(url, function (resultJson) {
	            onLoad(_this.parse(resultJson));
	        }, onProgress, onError);
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
	        window.addEventListener('resize', this.onResize.bind(this));
	    };
	    FSpyCamerLoader.prototype.removeResizeupdate = function () {
	        window.removeEventListener('resize', this.onResize.bind(this));
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
	            this.camera.setRotationFromMatrix(this.dataManager.rotationMatrix);
	            this.onResize();
	        }
	        return this.camera;
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
	    return FSpyCamerLoader;
	}(three.Loader));

	return FSpyCamerLoader;

})));
