import FSpyCameraLoader from '../src/index';
import { exampleJsonString01 } from './utils/ExampleJsonStrings';
import { PerspectiveCamera } from 'three';

describe('basic json parse test', (): void => {
  test('is instance of PerspectiveCamera ?', (): void => {
    const loader = new FSpyCameraLoader();
    expect(loader.parse(JSON.parse(exampleJsonString01))).toBeInstanceOf(
      PerspectiveCamera
    );
  });
});
