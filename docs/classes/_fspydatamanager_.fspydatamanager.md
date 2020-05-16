[fspy-camera-loader](../README.md) › [Globals](../globals.md) › ["FSpyDataManager"](../modules/_fspydatamanager_.md) › [FSpyDataManager](_fspydatamanager_.fspydatamanager.md)

# Class: FSpyDataManager

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

* [calcImageRatio](_fspydatamanager_.fspydatamanager.md#protected-calcimageratio)
* [getComputedData](_fspydatamanager_.fspydatamanager.md#getcomputeddata)
* [getData](_fspydatamanager_.fspydatamanager.md#getdata)
* [getVFovDegFromRad](_fspydatamanager_.fspydatamanager.md#protected-getvfovdegfromrad)
* [onRemoveData](_fspydatamanager_.fspydatamanager.md#protected-onremovedata)
* [onSetData](_fspydatamanager_.fspydatamanager.md#protected-onsetdata)
* [removeData](_fspydatamanager_.fspydatamanager.md#removedata)
* [setCameraPosition](_fspydatamanager_.fspydatamanager.md#protected-setcameraposition)
* [setComputedData](_fspydatamanager_.fspydatamanager.md#setcomputeddata)
* [setData](_fspydatamanager_.fspydatamanager.md#setdata)
* [setTransformMatrix](_fspydatamanager_.fspydatamanager.md#protected-settransformmatrix)

## Constructors

###  constructor

\+ **new FSpyDataManager**(): *[FSpyDataManager](_fspydatamanager_.fspydatamanager.md)*

*Defined in [src/FSpyDataManager.ts:14](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L14)*

**Returns:** *[FSpyDataManager](_fspydatamanager_.fspydatamanager.md)*

## Properties

### `Private` data

• **data**: *[FSpyCameraData](../interfaces/_type_.fspycameradata.md) | null*

*Defined in [src/FSpyDataManager.ts:7](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L7)*

___

### `Private` internalCameraFov

• **internalCameraFov**: *number*

*Defined in [src/FSpyDataManager.ts:9](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L9)*

___

### `Private` internalCameraPosition

• **internalCameraPosition**: *Vector3*

*Defined in [src/FSpyDataManager.ts:13](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L13)*

___

### `Private` internalCameraTransformMatrix

• **internalCameraTransformMatrix**: *Matrix4*

*Defined in [src/FSpyDataManager.ts:11](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L11)*

___

### `Private` internalImageRatio

• **internalImageRatio**: *number*

*Defined in [src/FSpyDataManager.ts:8](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L8)*

___

### `Private` internalIsSetData

• **internalIsSetData**: *boolean*

*Defined in [src/FSpyDataManager.ts:14](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L14)*

___

### `Private` internalOriginalImageSize

• **internalOriginalImageSize**: *Vector2*

*Defined in [src/FSpyDataManager.ts:10](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L10)*

___

### `Private` internalViewTransformMatrix

• **internalViewTransformMatrix**: *Matrix4*

*Defined in [src/FSpyDataManager.ts:12](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L12)*

___

### `Private` rawData

• **rawData**: *[FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) | null*

*Defined in [src/FSpyDataManager.ts:6](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L6)*

## Accessors

###  cameraFov

• **get cameraFov**(): *number*

*Defined in [src/FSpyDataManager.ts:150](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L150)*

**Returns:** *number*

___

###  cameraMatrix

• **get cameraMatrix**(): *Matrix4*

*Defined in [src/FSpyDataManager.ts:142](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L142)*

**Returns:** *Matrix4*

___

###  cameraPosition

• **get cameraPosition**(): *Vector3*

*Defined in [src/FSpyDataManager.ts:154](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L154)*

**Returns:** *Vector3*

___

###  imageHeight

• **get imageHeight**(): *number*

*Defined in [src/FSpyDataManager.ts:170](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L170)*

**Returns:** *number*

___

###  imageRatio

• **get imageRatio**(): *number*

*Defined in [src/FSpyDataManager.ts:134](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L134)*

**Returns:** *number*

___

###  imageSize

• **get imageSize**(): *Vector2*

*Defined in [src/FSpyDataManager.ts:162](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L162)*

**Returns:** *Vector2*

___

###  imageWidth

• **get imageWidth**(): *number*

*Defined in [src/FSpyDataManager.ts:166](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L166)*

**Returns:** *number*

___

###  isSetData

• **get isSetData**(): *boolean*

*Defined in [src/FSpyDataManager.ts:158](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L158)*

**Returns:** *boolean*

___

###  rotationMatrix

• **get rotationMatrix**(): *Matrix4*

*Defined in [src/FSpyDataManager.ts:138](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L138)*

**Returns:** *Matrix4*

___

###  viewMatrix

• **get viewMatrix**(): *Matrix4*

*Defined in [src/FSpyDataManager.ts:146](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L146)*

**Returns:** *Matrix4*

## Methods

### `Protected` calcImageRatio

▸ **calcImageRatio**(): *number*

*Defined in [src/FSpyDataManager.ts:98](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L98)*

**Returns:** *number*

___

###  getComputedData

▸ **getComputedData**(): *[FSpyCameraData](../interfaces/_type_.fspycameradata.md) | null*

*Defined in [src/FSpyDataManager.ts:44](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L44)*

**Returns:** *[FSpyCameraData](../interfaces/_type_.fspycameradata.md) | null*

___

###  getData

▸ **getData**(): *[FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) | null*

*Defined in [src/FSpyDataManager.ts:40](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L40)*

**Returns:** *[FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) | null*

___

### `Protected` getVFovDegFromRad

▸ **getVFovDegFromRad**(`radians`: number): *number*

*Defined in [src/FSpyDataManager.ts:107](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`radians` | number |

**Returns:** *number*

___

### `Protected` onRemoveData

▸ **onRemoveData**(): *void*

*Defined in [src/FSpyDataManager.ts:88](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L88)*

**Returns:** *void*

___

### `Protected` onSetData

▸ **onSetData**(): *void*

*Defined in [src/FSpyDataManager.ts:76](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L76)*

**Returns:** *void*

___

###  removeData

▸ **removeData**(): *void*

*Defined in [src/FSpyDataManager.ts:34](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L34)*

**Returns:** *void*

___

### `Protected` setCameraPosition

▸ **setCameraPosition**(): *void*

*Defined in [src/FSpyDataManager.ts:127](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L127)*

**Returns:** *void*

___

###  setComputedData

▸ **setComputedData**(): *void*

*Defined in [src/FSpyDataManager.ts:48](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L48)*

**Returns:** *void*

___

###  setData

▸ **setData**(`rawData`: [FSpyCameraJson](../interfaces/_type_.fspycamerajson.md)): *void*

*Defined in [src/FSpyDataManager.ts:28](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`rawData` | [FSpyCameraJson](../interfaces/_type_.fspycamerajson.md) |

**Returns:** *void*

___

### `Protected` setTransformMatrix

▸ **setTransformMatrix**(`transformArray`: [FSpyJsonTransformRows](../modules/_type_.md#fspyjsontransformrows), `matrix`: Matrix4): *Matrix4*

*Defined in [src/FSpyDataManager.ts:112](https://github.com/nasikusa/THREE.FSpyCamera/blob/f89d214/src/FSpyDataManager.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`transformArray` | [FSpyJsonTransformRows](../modules/_type_.md#fspyjsontransformrows) |
`matrix` | Matrix4 |

**Returns:** *Matrix4*
