import FSpyCameraLoader from '../src/index';
import { exampleJsonString01 } from './utils/ExampleJsonStrings';


describe('loader get data functions test' , (): void => {

  let loader:FSpyCameraLoader;
  beforeAll(() => {
    loader = new FSpyCameraLoader();
    loader.parse(JSON.parse(exampleJsonString01));
  })
  describe('basic json parse test', (): void => {
    test('is instance of PerspectiveCamera ?', (): void => {
      expect(loader.getData).toBeDefined();
    });  
  });
  describe('basic json parse test', (): void => {
    test('is instance of PerspectiveCamera ?', (): void => {
      expect(loader.getComputedData).toBeDefined();
    });  
  });

});
