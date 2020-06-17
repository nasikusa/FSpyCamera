import FSpyDataManager from '../src/FSpyDataManager';
import { exampleJsonString01 } from './utils/ExampleJsonStrings';

describe('data manager test', (): void => {
  let manager: FSpyDataManager;
  beforeAll(() => {
    manager = new FSpyDataManager();
    const parsedJson = JSON.parse(exampleJsonString01);
    manager.setData(parsedJson);
  });
  test('is manager image ratio defined ?', (): void => {
    expect(manager.imageRatio).toBeTruthy();
  });
  test('removeData function', (): void => {
    manager.removeData();
    expect(manager.getComputedData()).toBeNull();
  });
});
