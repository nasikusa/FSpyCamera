[three-fspy-camera-loader](../README.md) › [Globals](../globals.md) › ["FSpyCameraLoader"](../modules/_fspycameraloader_.md) › [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md)

# Class: FSpyCamerLoader

## Hierarchy

* Loader

  ↳ **FSpyCamerLoader**

## Index

### Constructors

* [constructor](_fspycameraloader_.fspycamerloader.md#constructor)

### Properties

* [camera](_fspycameraloader_.fspycamerloader.md#camera)
* [crossOrigin](_fspycameraloader_.fspycamerloader.md#crossorigin)
* [dataManager](_fspycameraloader_.fspycamerloader.md#protected-datamanager)
* [manager](_fspycameraloader_.fspycamerloader.md#manager)
* [path](_fspycameraloader_.fspycamerloader.md#path)
* [resourcePath](_fspycameraloader_.fspycamerloader.md#resourcepath)
* [targetCanvas](_fspycameraloader_.fspycamerloader.md#targetcanvas)
* [targetCanvasSize](_fspycameraloader_.fspycamerloader.md#targetcanvassize)

### Methods

* [createCamera](_fspycameraloader_.fspycamerloader.md#protected-createcamera)
* [load](_fspycameraloader_.fspycamerloader.md#load)
* [loadAsync](_fspycameraloader_.fspycamerloader.md#loadasync)
* [onResize](_fspycameraloader_.fspycamerloader.md#onresize)
* [parse](_fspycameraloader_.fspycamerloader.md#parse)
* [removeCanvas](_fspycameraloader_.fspycamerloader.md#removecanvas)
* [removeResizeupdate](_fspycameraloader_.fspycamerloader.md#removeresizeupdate)
* [setCanvas](_fspycameraloader_.fspycamerloader.md#setcanvas)
* [setCrossOrigin](_fspycameraloader_.fspycamerloader.md#setcrossorigin)
* [setPath](_fspycameraloader_.fspycamerloader.md#setpath)
* [setResizeUpdate](_fspycameraloader_.fspycamerloader.md#setresizeupdate)
* [setResourcePath](_fspycameraloader_.fspycamerloader.md#setresourcepath)

## Constructors

###  constructor

\+ **new FSpyCamerLoader**(`manager?`: LoadingManager): *[FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md)*

*Overrides void*

*Defined in [src/FSpyCameraLoader.ts:24](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`manager?` | LoadingManager |

**Returns:** *[FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md)*

## Properties

###  camera

• **camera**: *PerspectiveCamera*

*Defined in [src/FSpyCameraLoader.ts:12](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L12)*

PerspectiveCamera of three.js. The final result is stored on this camera.

___

###  crossOrigin

• **crossOrigin**: *string*

*Inherited from [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md).[crossOrigin](_fspycameraloader_.fspycamerloader.md#crossorigin)*

Defined in node_modules/three/src/loaders/Loader.d.ts:10

___

### `Protected` dataManager

• **dataManager**: *[FSpyDataManager](_fspydatamanager_.fspydatamanager.md)*

*Defined in [src/FSpyCameraLoader.ts:24](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L24)*

Class that manages camera data of fSpy

___

###  manager

• **manager**: *LoadingManager*

*Inherited from [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md).[manager](_fspycameraloader_.fspycamerloader.md#manager)*

Defined in node_modules/three/src/loaders/Loader.d.ts:13

___

###  path

• **path**: *string*

*Inherited from [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md).[path](_fspycameraloader_.fspycamerloader.md#path)*

Defined in node_modules/three/src/loaders/Loader.d.ts:11

___

###  resourcePath

• **resourcePath**: *string*

*Inherited from [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md).[resourcePath](_fspycameraloader_.fspycamerloader.md#resourcepath)*

Defined in node_modules/three/src/loaders/Loader.d.ts:12

___

###  targetCanvas

• **targetCanvas**: *HTMLCanvasElement | null*

*Defined in [src/FSpyCameraLoader.ts:19](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L19)*

Canvas that is the target for drawing WebGL

___

###  targetCanvasSize

• **targetCanvasSize**: *Vector2*

*Defined in [src/FSpyCameraLoader.ts:14](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L14)*

## Methods

### `Protected` createCamera

▸ **createCamera**(): *PerspectiveCamera*

*Defined in [src/FSpyCameraLoader.ts:105](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L105)*

Create a PerspectiveCamera of three.js from the camera data of fSpy.

**Returns:** *PerspectiveCamera*

Camera using fSpy camera data

___

###  load

▸ **load**(`url`: string, `onLoad`: function, `onProgress`: function, `onError`: function): *void*

*Defined in [src/FSpyCameraLoader.ts:43](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L43)*

load fSpy's camera data json

**Parameters:**

▪ **url**: *string*

Path to camera data json to be exported by fSpy

▪ **onLoad**: *function*

Function after loading

▸ (`camera`: PerspectiveCamera): *void*

**Parameters:**

Name | Type |
------ | ------ |
`camera` | PerspectiveCamera |

▪ **onProgress**: *function*

Function being loaded. Probably not needed due to the small data size.

▸ (): *void*

▪ **onError**: *function*

Function when the error occurred

▸ (): *void*

**Returns:** *void*

___

###  loadAsync

▸ **loadAsync**(`url`: string, `onProgress?`: undefined | function): *Promise‹any›*

*Inherited from [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md).[loadAsync](_fspycameraloader_.fspycamerloader.md#loadasync)*

Defined in node_modules/three/src/loaders/Loader.d.ts:20

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`onProgress?` | undefined &#124; function |

**Returns:** *Promise‹any›*

___

###  onResize

▸ **onResize**(): *void*

*Defined in [src/FSpyCameraLoader.ts:127](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L127)*

Change the camera data according to the size of the canvas to render.

**Returns:** *void*

___

###  parse

▸ **parse**(`fSpyJson`: [FSpyCameraJson](../interfaces/_type_.fspycamerajson.md)): *PerspectiveCamera*

*Defined in [src/FSpyCameraLoader.ts:67](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L67)*

Parses fSpy json data. This function is also called after the load function.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fSpyJson` | [FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) | json data from fSpy. Please put the parsed one, such as JSON.parse (json) ;. |

**Returns:** *PerspectiveCamera*

Camera using fSpy camera data

___

###  removeCanvas

▸ **removeCanvas**(): *void*

*Defined in [src/FSpyCameraLoader.ts:83](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L83)*

Remove the data for the canvas element.

**Returns:** *void*

___

###  removeResizeupdate

▸ **removeResizeupdate**(): *void*

*Defined in [src/FSpyCameraLoader.ts:97](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L97)*

Disables the ability to change camera data to fit the size of the canvas to render.

**Returns:** *void*

___

###  setCanvas

▸ **setCanvas**(`canvas`: HTMLCanvasElement): *void*

*Defined in [src/FSpyCameraLoader.ts:76](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L76)*

Add the data for the canvas element for the library to know.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`canvas` | HTMLCanvasElement | Canvas that is the target for drawing WebGL  |

**Returns:** *void*

___

###  setCrossOrigin

▸ **setCrossOrigin**(`crossOrigin`: string): *this*

*Inherited from [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md).[setCrossOrigin](_fspycameraloader_.fspycamerloader.md#setcrossorigin)*

Defined in node_modules/three/src/loaders/Loader.d.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`crossOrigin` | string |

**Returns:** *this*

___

###  setPath

▸ **setPath**(`path`: string): *this*

*Inherited from [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md).[setPath](_fspycameraloader_.fspycamerloader.md#setpath)*

Defined in node_modules/three/src/loaders/Loader.d.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *this*

___

###  setResizeUpdate

▸ **setResizeUpdate**(): *void*

*Defined in [src/FSpyCameraLoader.ts:90](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyCameraLoader.ts#L90)*

Enables the ability to change the camera data according to the size of the canvas to render.

**Returns:** *void*

___

###  setResourcePath

▸ **setResourcePath**(`resourcePath`: string): *this*

*Inherited from [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md).[setResourcePath](_fspycameraloader_.fspycamerloader.md#setresourcepath)*

Defined in node_modules/three/src/loaders/Loader.d.ts:24

**Parameters:**

Name | Type |
------ | ------ |
`resourcePath` | string |

**Returns:** *this*
