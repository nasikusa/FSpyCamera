[three-fspy-camera-loader](../README.md) › [Globals](../globals.md) › ["FSpyDataManager"](../modules/_fspydatamanager_.md) › [FSpyDataManager](_fspydatamanager_.fspydatamanager.md)

# Class: FSpyDataManager

A class that stores the camera data of fSpy and processes it for three.js

## Hierarchy

* **FSpyDataManager**

## Implements

* [DataManager](../interfaces/_type_.datamanager.md)

## Index

### Constructors

* [constructor](_fspydatamanager_.fspydatamanager.md#constructor)

### Properties

* [data](_fspydatamanager_.fspydatamanager.md#private-data)
* [internalCameraFov](_fspydatamanager_.fspydatamanager.md#private-internalcamerafov)
* [internalCameraPosition](_fspydatamanager_.fspydatamanager.md#private-internalcameraposition)
* [internalCameraTransformMatrix](_fspydatamanager_.fspydatamanager.md#private-internalcameratransformmatrix)
* [internalImageRatio](_fspydatamanager_.fspydatamanager.md#private-internalimageratio)
* [internalIsSetData](_fspydatamanager_.fspydatamanager.md#private-internalissetdata)
* [internalOriginalImageSize](_fspydatamanager_.fspydatamanager.md#private-internaloriginalimagesize)
* [internalViewTransformMatrix](_fspydatamanager_.fspydatamanager.md#private-internalviewtransformmatrix)
* [rawData](_fspydatamanager_.fspydatamanager.md#private-rawdata)

### Accessors

* [cameraFov](_fspydatamanager_.fspydatamanager.md#camerafov)
* [cameraMatrix](_fspydatamanager_.fspydatamanager.md#cameramatrix)
* [cameraPosition](_fspydatamanager_.fspydatamanager.md#cameraposition)
* [imageHeight](_fspydatamanager_.fspydatamanager.md#imageheight)
* [imageRatio](_fspydatamanager_.fspydatamanager.md#imageratio)
* [imageSize](_fspydatamanager_.fspydatamanager.md#imagesize)
* [imageWidth](_fspydatamanager_.fspydatamanager.md#imagewidth)
* [isSetData](_fspydatamanager_.fspydatamanager.md#issetdata)
* [rotationMatrix](_fspydatamanager_.fspydatamanager.md#rotationmatrix)
* [viewMatrix](_fspydatamanager_.fspydatamanager.md#viewmatrix)

### Methods

* [calcImageRatio](_fspydatamanager_.fspydatamanager.md#private-calcimageratio)
* [getComputedData](_fspydatamanager_.fspydatamanager.md#getcomputeddata)
* [getData](_fspydatamanager_.fspydatamanager.md#getdata)
* [onRemoveData](_fspydatamanager_.fspydatamanager.md#private-onremovedata)
* [onSetData](_fspydatamanager_.fspydatamanager.md#private-onsetdata)
* [removeData](_fspydatamanager_.fspydatamanager.md#removedata)
* [setCameraPosition](_fspydatamanager_.fspydatamanager.md#private-setcameraposition)
* [setComputedData](_fspydatamanager_.fspydatamanager.md#private-setcomputeddata)
* [setData](_fspydatamanager_.fspydatamanager.md#setdata)
* [setTransformMatrix](_fspydatamanager_.fspydatamanager.md#private-settransformmatrix)
* [getVFovDegFromRad](_fspydatamanager_.fspydatamanager.md#static-private-getvfovdegfromrad)

## Constructors

###  constructor

\+ **new FSpyDataManager**(): *[FSpyDataManager](_fspydatamanager_.fspydatamanager.md)*

*Defined in [src/FSpyDataManager.ts:52](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L52)*

**Returns:** *[FSpyDataManager](_fspydatamanager_.fspydatamanager.md)*

## Properties

### `Private` data

• **data**: *[FSpyCameraData](../interfaces/_type_.fspycameradata.md) | null*

*Defined in [src/FSpyDataManager.ts:17](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L17)*

json data from fSpy converted to data for three.js

___

### `Private` internalCameraFov

• **internalCameraFov**: *number*

*Defined in [src/FSpyDataManager.ts:27](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L27)*

Camera viewing angle

___

### `Private` internalCameraPosition

• **internalCameraPosition**: *Vector3*

*Defined in [src/FSpyDataManager.ts:47](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L47)*

Camera position

___

### `Private` internalCameraTransformMatrix

• **internalCameraTransformMatrix**: *Matrix4*

*Defined in [src/FSpyDataManager.ts:37](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L37)*

Camera matrix

___

### `Private` internalImageRatio

• **internalImageRatio**: *number*

*Defined in [src/FSpyDataManager.ts:22](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L22)*

Image ratio

___

### `Private` internalIsSetData

• **internalIsSetData**: *boolean*

*Defined in [src/FSpyDataManager.ts:52](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L52)*

bool value indicating whether fSpy data was stored

___

### `Private` internalOriginalImageSize

• **internalOriginalImageSize**: *Vector2*

*Defined in [src/FSpyDataManager.ts:32](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L32)*

Image size

___

### `Private` internalViewTransformMatrix

• **internalViewTransformMatrix**: *Matrix4*

*Defined in [src/FSpyDataManager.ts:42](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L42)*

View matrix

___

### `Private` rawData

• **rawData**: *[FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) | null*

*Defined in [src/FSpyDataManager.ts:12](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L12)*

json data output from fSpy

## Accessors

###  cameraFov

• **get cameraFov**(): *number*

*Defined in [src/FSpyDataManager.ts:246](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L246)*

**Returns:** *number*

___

###  cameraMatrix

• **get cameraMatrix**(): *Matrix4*

*Defined in [src/FSpyDataManager.ts:238](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L238)*

**Returns:** *Matrix4*

___

###  cameraPosition

• **get cameraPosition**(): *Vector3*

*Defined in [src/FSpyDataManager.ts:250](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L250)*

**Returns:** *Vector3*

___

###  imageHeight

• **get imageHeight**(): *number*

*Defined in [src/FSpyDataManager.ts:266](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L266)*

**Returns:** *number*

___

###  imageRatio

• **get imageRatio**(): *number*

*Defined in [src/FSpyDataManager.ts:227](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L227)*

get image rato data

**Returns:** *number*

___

###  imageSize

• **get imageSize**(): *Vector2*

*Defined in [src/FSpyDataManager.ts:258](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L258)*

**Returns:** *Vector2*

___

###  imageWidth

• **get imageWidth**(): *number*

*Defined in [src/FSpyDataManager.ts:262](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L262)*

**Returns:** *number*

___

###  isSetData

• **get isSetData**(): *boolean*

*Defined in [src/FSpyDataManager.ts:254](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L254)*

**Returns:** *boolean*

___

###  rotationMatrix

• **get rotationMatrix**(): *Matrix4*

*Defined in [src/FSpyDataManager.ts:234](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L234)*

**`deprecated`** 

**Returns:** *Matrix4*

___

###  viewMatrix

• **get viewMatrix**(): *Matrix4*

*Defined in [src/FSpyDataManager.ts:242](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L242)*

**Returns:** *Matrix4*

## Methods

### `Private` calcImageRatio

▸ **calcImageRatio**(): *number*

*Defined in [src/FSpyDataManager.ts:162](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L162)*

Calculate image ratio

**Returns:** *number*

image ratio

___

###  getComputedData

▸ **getComputedData**(): *[FSpyCameraData](../interfaces/_type_.fspycameradata.md) | null*

*Defined in [src/FSpyDataManager.ts:95](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L95)*

Get camera data processed for three.js

**Returns:** *[FSpyCameraData](../interfaces/_type_.fspycameradata.md) | null*

___

###  getData

▸ **getData**(): *[FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) | null*

*Defined in [src/FSpyDataManager.ts:88](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L88)*

Get unprocessed internal camera data

**Returns:** *[FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) | null*

___

### `Private` onRemoveData

▸ **onRemoveData**(): *void*

*Defined in [src/FSpyDataManager.ts:148](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L148)*

Function that works when data from fSpy is removed

**Returns:** *void*

___

### `Private` onSetData

▸ **onSetData**(): *void*

*Defined in [src/FSpyDataManager.ts:133](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L133)*

Function that works when data from fSpy is set

**Returns:** *void*

___

###  removeData

▸ **removeData**(): *void*

*Defined in [src/FSpyDataManager.ts:79](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L79)*

Remove json data from fSpy

**Returns:** *void*

___

### `Private` setCameraPosition

▸ **setCameraPosition**(): *void*

*Defined in [src/FSpyDataManager.ts:217](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L217)*

Set the camera position

**Returns:** *void*

___

### `Private` setComputedData

▸ **setComputedData**(): *void*

*Defined in [src/FSpyDataManager.ts:102](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L102)*

Get camera data processed for three.js

**Returns:** *void*

___

###  setData

▸ **setData**(`rawData`: [FSpyCameraJson](../interfaces/_type_.fspycamerajson.md)): *void*

*Defined in [src/FSpyDataManager.ts:70](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L70)*

Set json data from fSpy

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`rawData` | [FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) | json data output from fSpy  |

**Returns:** *void*

___

### `Private` setTransformMatrix

▸ **setTransformMatrix**(`transformArray`: [FSpyJsonTransformRows](../modules/_type_.md#fspyjsontransformrows), `matrix`: Matrix4): *Matrix4*

*Defined in [src/FSpyDataManager.ts:181](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L181)*

Transform matrix data of transform of fSpy into Matrix4 of three.js.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`transformArray` | [FSpyJsonTransformRows](../modules/_type_.md#fspyjsontransformrows) | Matrix data from the underlying fSpy |
`matrix` | Matrix4 | Matrix data object to be set |

**Returns:** *Matrix4*

Returns the matrix object passed as the second argument. If it fails for any reason, it returns empty matrix data.

___

### `Static` `Private` getVFovDegFromRad

▸ **getVFovDegFromRad**(`radians`: number): *number*

*Defined in [src/FSpyDataManager.ts:171](https://github.com/nasikusa/THREE.FSpyCamera/blob/f992a0c/src/FSpyDataManager.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`radians` | number |

**Returns:** *number*
