import FSpyCameraLoader from '../src/index';
import { exampleJsonString01 } from './utils/ExampleJsonStrings';

describe('loader event functions test', (): void => {
  let loader: FSpyCameraLoader;
  beforeAll(() => {
    loader = new FSpyCameraLoader();
    loader.parse(JSON.parse(exampleJsonString01));
  });
  test('is getter working ?', (): void => {
    expect(loader.isEnableResizeEvent).toBeFalsy();
  });
  test('is setter and getter working ?', (): void => {
    loader.isEnableResizeEvent = true;
    expect(loader.isEnableResizeEvent).toBeTruthy();
  });
  test('is event function working ? (enable)', (): void => {
    loader.setResizeUpdate();
    expect(loader.isEnableResizeEvent).toBeTruthy();
  });
  test('is event function working ? (disable)', (): void => {
    loader.setResizeUpdate();
    loader.removeResizeupdate();
    expect(loader.isEnableResizeEvent).toBeFalsy();
  });
});
