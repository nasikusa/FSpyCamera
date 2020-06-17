import FSpyCameraLoader from '../src/index';
import { setUserAgent } from './utils/UserAgent';
import { exampleJsonString01 } from './utils/ExampleJsonStrings';

describe('load functions test (IE11)', (): void => {
  let loader: FSpyCameraLoader;
  const ua = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like Gecko";

  beforeAll(() => {
    setUserAgent(window, ua);
    console.log(window.navigator.userAgent);
    loader = new FSpyCameraLoader();
    loader.parse(JSON.parse(exampleJsonString01));
  });
  test('is result data exist ?', (): void => {
    expect(loader.getData()).toBeTruthy();
  });
  test('is computed result data exist ?', (): void => {
    expect(loader.getComputedData()).toBeTruthy();
  });
});
