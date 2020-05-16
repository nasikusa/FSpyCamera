[fspy-camera-loader](../README.md) › [Globals](../globals.md) › ["FSpyCameraLoader"](../modules/_fspycameraloader_.md) › [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md)

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

*Defined in [src/FSpyCameraLoader.ts:11](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`manager?` | LoadingManager |

**Returns:** *[FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md)*

## Properties

###  camera

• **camera**: *PerspectiveCamera*

*Defined in [src/FSpyCameraLoader.ts:8](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L8)*

___

###  crossOrigin

• **crossOrigin**: *string*

*Inherited from [FSpyCamerLoader](_fspycameraloader_.fspycamerloader.md).[crossOrigin](_fspycameraloader_.fspycamerloader.md#crossorigin)*

Defined in node_modules/three/src/loaders/Loader.d.ts:10

___

### `Protected` dataManager

• **dataManager**: *[FSpyDataManager](_fspydatamanager_.fspydatamanager.md)*

*Defined in [src/FSpyCameraLoader.ts:11](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L11)*

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

*Defined in [src/FSpyCameraLoader.ts:10](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L10)*

___

###  targetCanvasSize

• **targetCanvasSize**: *Vector2*

*Defined in [src/FSpyCameraLoader.ts:9](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L9)*

## Methods

### `Protected` createCamera

▸ **createCamera**(): *PerspectiveCamera*

*Defined in [src/FSpyCameraLoader.ts:63](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L63)*

**Returns:** *PerspectiveCamera*

___

###  load

▸ **load**(`url`: string, `onLoad`: function, `onProgress`: function, `onError`: function): *void*

*Defined in [src/FSpyCameraLoader.ts:23](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L23)*

**Parameters:**

▪ **url**: *string*

▪ **onLoad**: *function*

▸ (`camera`: PerspectiveCamera): *void*

**Parameters:**

Name | Type |
------ | ------ |
`camera` | PerspectiveCamera |

▪ **onProgress**: *function*

▸ (): *void*

▪ **onError**: *function*

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

*Defined in [src/FSpyCameraLoader.ts:82](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L82)*

**Returns:** *void*

___

###  parse

▸ **parse**(`fSpyJson`: [FSpyCameraJson](../interfaces/_type_.fspycamerajson.md)): *PerspectiveCamera*

*Defined in [src/FSpyCameraLoader.ts:42](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`fSpyJson` | [FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) |

**Returns:** *PerspectiveCamera*

___

###  removeCanvas

▸ **removeCanvas**(): *void*

*Defined in [src/FSpyCameraLoader.ts:51](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L51)*

**Returns:** *void*

___

###  removeResizeupdate

▸ **removeResizeupdate**(): *void*

*Defined in [src/FSpyCameraLoader.ts:59](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L59)*

**Returns:** *void*

___

###  setCanvas

▸ **setCanvas**(`canvas`: HTMLCanvasElement): *void*

*Defined in [src/FSpyCameraLoader.ts:47](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | HTMLCanvasElement |

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

*Defined in [src/FSpyCameraLoader.ts:55](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyCameraLoader.ts#L55)*

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
