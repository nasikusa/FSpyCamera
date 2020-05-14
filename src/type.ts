export type FourElemArray<T> = [T, T, T, T];
export type vanishingPointAxesStrings =
  | 'xPositive'
  | 'xNegative'
  | 'yPositive'
  | 'yNegative'
  | 'zPositive'
  | 'zNegative';

/**
 * fSpyから吐き出されるjson形式のカメラデータ
 */
export interface FSpyCameraJson {
  principalPoint: {
    x: number;
    y: number;
  };
  viewTransform: {
    rows: [FourElemArray<number>, FourElemArray<number>, FourElemArray<number>, FourElemArray<number>];
  };
  cameraTransform: {
    rows: [FourElemArray<number>, FourElemArray<number>, FourElemArray<number>, FourElemArray<number>];
  };
  horizontalFieldOfView: number;
  verticalFieldOfView: number;
  vanishingPoints: [
    {
      x: number;
      y: number;
    },
    {
      x: number;
      y: number;
    },
    {
      x: number;
      y: number;
    }
  ];
  vanishingPointAxes: [vanishingPointAxesStrings, vanishingPointAxesStrings, vanishingPointAxesStrings];
  relativeFocalLength: number;
  imageWidth: number;
  imageHeight: number;
}

export interface DataManager {
  setData: (data: FSpyCameraJson) => void;
  removeData: () => void;
  getData: () => FSpyCameraJson | null;
}
