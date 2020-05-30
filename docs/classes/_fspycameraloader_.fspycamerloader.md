[three-fspy-camera-loader](../README.md) › ["FSpyCameraLoader"](../modules/_fspycameraloader_.md) › [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md)

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
* [dataManager](_fspycameraloader_.fspycamerloader.md#datamanager)
* [internalIsEnableResizeEvent](_fspycameraloader_.fspycamerloader.md#private-internalisenableresizeevent)
* [isIE](_fspycameraloader_.fspycamerloader.md#private-isie)
* [manager](_fspycameraloader_.fspycamerloader.md#manager)
* [path](_fspycameraloader_.fspycamerloader.md#path)
* [resourcePath](_fspycameraloader_.fspycamerloader.md#resourcepath)
* [targetCanvas](_fspycameraloader_.fspycamerloader.md#targetcanvas)
* [targetCanvasSize](_fspycameraloader_.fspycamerloader.md#targetcanvassize)

### Accessors

* [isEnableResizeEvent](_fspycameraloader_.fspycamerloader.md#isenableresizeevent)

### Methods

* [createCamera](_fspycameraloader_.fspycamerloader.md#protected-createcamera)
* [getComputedData](_fspycameraloader_.fspycamerloader.md#getcomputeddata)
* [getData](_fspycameraloader_.fspycamerloader.md#getdata)
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
* [getIsUseIE](_fspycameraloader_.fspycamerloader.md#static-private-getisuseie)

## Constructors

###  constructor

\+ **new FSpyCamerLoader**(`manager?`: LoadingManager): *[FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md)*

*Overrides void*

*Defined in [src/FSpyCameraLoader.ts:37](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`manager?` | LoadingManager |

**Returns:** *[FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md)*

## Properties

###  camera

• **camera**: *PerspectiveCamera*

*Defined in [src/FSpyCameraLoader.ts:12](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L12)*

PerspectiveCamera of three.js. The final result is stored on this camera.

___

###  crossOrigin

• **crossOrigin**: *string*

*Inherited from [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md).[crossOrigin](_fspycameraloader_.fspycamerloader.md#crossorigin)*

Defined in node_modules/three/src/loaders/Loader.d.ts:10

___

###  dataManager

• **dataManager**: *[FSpyDataManager](_fspydatamanager_.fspydatamanager.md)*

*Defined in [src/FSpyCameraLoader.ts:27](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L27)*

Class that manages camera data of fSpy

___

### `Private` internalIsEnableResizeEvent

• **internalIsEnableResizeEvent**: *boolean*

*Defined in [src/FSpyCameraLoader.ts:37](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L37)*

Resize event flag used internally

___

### `Private` isIE

• **isIE**: *boolean*

*Defined in [src/FSpyCameraLoader.ts:32](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L32)*

Flag whether the browser is IE

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

*Defined in [src/FSpyCameraLoader.ts:22](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L22)*

Canvas that is the target for drawing WebGL

___

###  targetCanvasSize

• **targetCanvasSize**: *Vector2*

*Defined in [src/FSpyCameraLoader.ts:17](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L17)*

The size of the target canvas

## Accessors

###  isEnableResizeEvent

• **get isEnableResizeEvent**(): *boolean*

*Defined in [src/FSpyCameraLoader.ts:54](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L54)*

Gets whether the resize event is set

**Returns:** *boolean*

• **set isEnableResizeEvent**(`resizeEventBoolean`: boolean): *void*

*Defined in [src/FSpyCameraLoader.ts:61](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L61)*

Enable / disable resize event

**Parameters:**

Name | Type |
------ | ------ |
`resizeEventBoolean` | boolean |

**Returns:** *void*

## Methods

### `Protected` createCamera

▸ **createCamera**(): *PerspectiveCamera*

*Defined in [src/FSpyCameraLoader.ts:153](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L153)*

Create a PerspectiveCamera of three.js from the camera data of fSpy.

**Returns:** *PerspectiveCamera*

Camera using fSpy camera data

___

###  getComputedData

▸ **getComputedData**(): *[FSpyCameraData](../interfaces/_type_.fspycameradata.md) | null*

*Defined in [src/FSpyCameraLoader.ts:227](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L227)*

Get camera data processed for three.js

**Returns:** *[FSpyCameraData](../interfaces/_type_.fspycameradata.md) | null*

json data from fSpy converted to data for three.js

___

###  getData

▸ **getData**(): *[FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) | null*

*Defined in [src/FSpyCameraLoader.ts:219](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L219)*

Get unprocessed internal camera data

**Returns:** *[FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) | null*

json data output from fSpy

___

###  load

▸ **load**(`url`: string, `onLoad?`: undefined | function, `onProgress?`: undefined | function, `onError?`: undefined | function): *void*

*Defined in [src/FSpyCameraLoader.ts:80](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L80)*

load fSpy's camera data json

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`url` | string | Path to camera data json to be exported by fSpy |
`onLoad?` | undefined &#124; function | Function after loading |
`onProgress?` | undefined &#124; function | Function being loaded. Probably not needed due to the small data size. |
`onError?` | undefined &#124; function | Function when the error occurred TODO: IE  |

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

*Defined in [src/FSpyCameraLoader.ts:195](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L195)*

Change the camera data according to the size of the canvas to render.

**Returns:** *void*

___

###  parse

▸ **parse**(`fSpyJson`: [FSpyCameraJson](../interfaces/_type_.fspycamerajson.md)): *PerspectiveCamera*

*Defined in [src/FSpyCameraLoader.ts:115](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L115)*

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

*Defined in [src/FSpyCameraLoader.ts:131](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L131)*

Remove the data for the canvas element.

**Returns:** *void*

___

###  removeResizeupdate

▸ **removeResizeupdate**(): *void*

*Defined in [src/FSpyCameraLoader.ts:145](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L145)*

Disables the ability to change camera data to fit the size of the canvas to render.

**Returns:** *void*

___

###  setCanvas

▸ **setCanvas**(`canvas`: HTMLCanvasElement): *void*

*Defined in [src/FSpyCameraLoader.ts:124](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L124)*

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

*Defined in [src/FSpyCameraLoader.ts:138](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L138)*

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

___

### `Static` `Private` getIsUseIE

▸ **getIsUseIE**(): *boolean*

*Defined in [src/FSpyCameraLoader.ts:184](https://github.com/nasikusa/THREE.FSpyCamera/blob/9e3dc6a/src/FSpyCameraLoader.ts#L184)*

Get if browser is IE

**Returns:** *boolean*

IE bool
